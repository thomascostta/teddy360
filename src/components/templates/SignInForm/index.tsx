import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../../../hook/auth";

import { Container, ContentForm, FooterContainer } from "./styles";
import { StatusText } from "../../atoms/StatusText";
import { ButtonPrimary } from "../../atoms/ButtonPrimary";
import { ButtonText } from "../../atoms/ButtonText";
import { FooterInfo } from "../../atoms/FooterInfo";
import { HeaderSignIn } from "../../molecules/HeaderSignIn";
import { InputEmail } from "../../molecules/InputEmail";
import { InputPassword } from "../../molecules/InputPassword";

type FormDataEmail = {
  email: string;
};

type FormDataPassword = {
  password: string;
};

const schemaEmail = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
});

const schemaPassword = yup.object().shape({
  password: yup
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
});

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInEmail, signInPassword, toggleUserVisibility } = useAuth();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const textButtonText = "Acessar como um novo usuário";

  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    clearErrors: clearErrorsEmail,
    setError: setErrorEmail,
    formState: { errors: errorsEmail, isValid: isValidEmail },
  } = useForm({
    resolver: yupResolver<FormDataEmail>(schemaEmail),
  });

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    clearErrors: clearErrorsPassword,
    setError: setErrorPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver<FormDataPassword>(schemaPassword),
  });

  async function onSubmitEmail(emailValue: FormDataEmail) {
    const { email } = emailValue;

    signInEmail(email)
      .then(() => {
        clearErrorsEmail("email");
        setShowPassword(true);
      })
      .catch(() => {
        setShowPassword(false);
        isValidEmail &&
          setErrorEmail("email", {
            type: "manual",
            message: "Parece que você errou alguma coisa.",
          });
      });
  }

  async function onSubmitPassword(passwordValue: FormDataPassword) {
    const { password } = passwordValue;

    signInPassword(password)
      .then(() => {
        clearErrorsPassword("password");
        setShowPassword(true);
        navigate("HomeStackPublic");
      })
      .catch(() => {
        setErrorPassword("password", {
          type: "manual",
          message: "Verifique o seu e-mail ou senha.",
        });
      });
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      extraScrollHeight={110}
      enableOnAndroid
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContentForm>
            <HeaderSignIn optionText="useYourEmail"/>
            <ButtonText
              label={textButtonText}
              marginBotton={18.5}
              onPress={() => toggleUserVisibility("anotherUser")}
              hasIcon
            />
            <Controller
              control={controlEmail}
              render={({ field: { onChange, value, onBlur } }) => (
                <InputEmail
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="E-mail"
                  isValidEmail={!!errorsEmail.email}
                  marginBottom={!errorsEmail.email ? 16 : 0}
                />
              )}
              name="email"
              rules={{ required: true }}
            />
            {errorsEmail.email && (
              <StatusText
                text={errorsEmail.email.message || ""}
                status="error"
              />
            )}

            {!showPassword && (
              <ButtonPrimary
                label="Continuar"
                marginTop={16}
                onPress={handleSubmitEmail(onSubmitEmail)}
              />
            )}

            {showPassword && (
              <>
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
                  name="password"
                  rules={{ required: true }}
                />
                {errorsPassword.password && (
                  <StatusText
                    text={errorsPassword.password.message || ""}
                    status="error"
                  />
                )}
                <ButtonPrimary
                  label="Acessar"
                  onPress={handleSubmitPassword(onSubmitPassword)}
                  marginTop={32}
                />
              </>
            )}
            <ButtonText
              label="Esqueceu sua senha?"
              onPress={() => toggleUserVisibility("forgotPassword")}
              marginTop={20.5}
            />
          </ContentForm>
          <FooterContainer>
            <FooterInfo />
          </FooterContainer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
