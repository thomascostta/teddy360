import { Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../../../hook/auth";

import { ContainerPasswordRequirements } from "./styles";
import { StatusText } from "../../atoms/StatusText";
import { ButtonPrimary } from "../../atoms/ButtonPrimary";
import { ButtonText } from "../../atoms/ButtonText";
import { StepsForm } from "../../molecules/StepsForm";
import { InputPassword } from "../../molecules/InputPassword";
import { HeaderSignIn } from "../../molecules/HeaderSignIn";
import { ModalTermsOfUse } from "../../molecules/ModalTermsOfUse";

type FormDataPassword = {
  newPassword: string;
  confirmNewPassword: string;
};

const schemaPassword = yup.object().shape({
  newPassword: yup.string().required("Informe a nova senha."),
  confirmNewPassword: yup
    .string()
    .required("Informe a nova senha.")
    .oneOf([yup.ref("newPassword")], "As senhas precisam ser iguais."),
});

export function ThirdStepForgotPassword() {
  const {
    createNewPassword,
    isStepsForgotPassword,
    toggleUserVisibility,
    toggleStepsForgotPassword,
  } = useAuth();
  const [minChar, setMinChar] = useState(false);
  const [capitalLetter, setCapitalLetter] = useState(false);
  const [lowCase, setLowCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [samePasswords, setSamePasswords] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    clearErrors: clearErrorsPassword,
    setError: setErrorPassword,
    formState: { errors: errorsPassword },
    watch,
  } = useForm({
    resolver: yupResolver<FormDataPassword>(schemaPassword),
  });

  const passwordRequirements = [
    { index: 1, text: "Possuir no mínimo 8 caracteres", checked: minChar },
    {
      index: 2,
      text: "Possuir ao menos uma letra maiúscula",
      checked: capitalLetter,
    },
    {
      index: 3,
      text: "Possuir ao menos uma letra minúscula",
      checked: lowCase,
    },
    {
      index: 4,
      text: "Possuir ao menos um caractere especial",
      checked: specialChar,
    },
    {
      index: 5,
      text: "As senhas coincidem",
      checked: samePasswords,
    },
  ];

  const hasSpecialChar = /^(?=.*[`$!*&@$#?,.%()<>`])/;
  const has8Min = /^(?=^.{8,}$)/;
  const hasCapitalLetter = /^(?=.*[A-Z])/;
  const hasLoweCase = /^(?=.*[a-z])/;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePassword = useCallback((newPassword: string) => {
    setMinChar(has8Min.test(newPassword));
    setCapitalLetter(hasCapitalLetter.test(newPassword));
    setLowCase(hasLoweCase.test(newPassword));
    setSpecialChar(hasSpecialChar.test(newPassword));
  }, []);

  async function onSubmitPassword(passwordValue: FormDataPassword) {
    const { newPassword, confirmNewPassword } = passwordValue;
    if (newPassword === confirmNewPassword) {
      createNewPassword(confirmNewPassword)
        .then(() => {
          clearErrorsPassword("confirmNewPassword");
          Alert.alert(
            "Termos e condições\nda plataforma",
            `Clique aqui para ler os termos e\nacessar a plataforma Teddy360º.`,
            [
              {
                text: "Ler os termos",
                onPress: () => {
                  toggleModal();
                },
              },
              {
                text: "Aceitar os termos e acessar",
                onPress: () => {
                  toggleUserVisibility("newLogin");
                  toggleStepsForgotPassword("first");
                },
              },
              {
                text: "Fechar",
              },
            ]
          );
        })
        .catch(() => {
          setErrorPassword("confirmNewPassword", {
            type: "manual",
            message: "Verifique o seu e-mail ou senha.",
          });
        });
    } else {
      setErrorPassword("confirmNewPassword", {
        type: "manual",
        message: "Verifique sua conexão ou tente mais tarde.",
      });
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const { newPassword, confirmNewPassword } = value;
      if (name === "newPassword") {
        return handlePassword(String(value.newPassword));
      }
      if (newPassword === confirmNewPassword) {
        setSamePasswords(true);
      } else {
        setSamePasswords(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <HeaderSignIn optionText="allVeryWell" />
      <StepsForm steps={isStepsForgotPassword} marginBotton={16} />
      <Controller
        control={controlPassword}
        render={({ field: { onChange, value, onBlur } }) => (
          <InputPassword
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Senha"
          />
        )}
        name="newPassword"
        rules={{ required: true }}
      />
      {errorsPassword.newPassword && (
        <StatusText
          text={errorsPassword.newPassword.message || ""}
          status="error"
        />
      )}
      <Controller
        control={controlPassword}
        render={({ field: { onChange, value, onBlur } }) => (
          <InputPassword
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Senha"
          />
        )}
        name="confirmNewPassword"
        rules={{ required: true }}
      />
      <ContainerPasswordRequirements>
        {passwordRequirements.map((item, index) => {
          return (
            <StatusText
              key={index}
              text={item.text}
              status={item.checked === false ? "error" : "success"}
            />
          );
        })}
      </ContainerPasswordRequirements>
      <ButtonPrimary
        label="Acessar"
        onPress={handleSubmitPassword(onSubmitPassword)}
        marginTop={29}
      />
      <ButtonText
        label="Cancelar e voltar ao login"
        marginTop={20.5}
        onPress={() => {
          toggleUserVisibility("newLogin");
          toggleStepsForgotPassword("first");
        }}
      />
      <ModalTermsOfUse
        isVisible={isModalVisible}
        onClose={toggleModal}
        onPressButton={() => {
          toggleUserVisibility("newLogin");
          toggleStepsForgotPassword("first");
        }}
      />
    </>
  );
}
