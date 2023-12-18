import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../../../hook/auth";

import { StatusText } from "../../atoms/StatusText";
import { ButtonPrimary } from "../../atoms/ButtonPrimary";
import { ButtonText } from "../../atoms/ButtonText";
import { InputEmail } from "../../molecules/InputEmail";
import { StepsForm } from "../../molecules/StepsForm";
import { HeaderSignIn } from "../../molecules/HeaderSignIn";

type FormDataEmail = {
  email: string;
};

const schemaEmail = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
});

export function FirstStepForgotPassword() {
  const {
    signInEmail,
    toggleStepsForgotPassword,
    isStepsForgotPassword,
    toggleUserVisibility,
  } = useAuth();

  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    clearErrors: clearErrorsEmail,
    setError: setErrorEmail,
    formState: { errors: errorsEmail, isValid: isValidEmail },
  } = useForm({
    resolver: yupResolver<FormDataEmail>(schemaEmail),
  });

  async function onSubmitEmail(emailValue: FormDataEmail) {
    const { email } = emailValue;

    signInEmail(email)
      .then(() => {
        clearErrorsEmail("email");
        toggleStepsForgotPassword("second");
      })
      .catch(() => {
        isValidEmail &&
          setErrorEmail("email", {
            type: "manual",
            message: "Parece que você errou alguma coisa.",
          });
      });
  }

  return (
    <>
      <HeaderSignIn optionText="firstStep" />
      <StepsForm steps={isStepsForgotPassword} marginBotton={16} />
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
        <StatusText text={errorsEmail.email.message || ""} status="error" />
      )}

      <ButtonPrimary
        label="Continuar"
        marginTop={16}
        onPress={handleSubmitEmail(onSubmitEmail)}
      />

      <ButtonText
        label="Cancelar e voltar ao login"
        marginTop={20.5}
        onPress={() => {
          toggleUserVisibility("newLogin");
          toggleStepsForgotPassword("first");
        }}
      />
    </>
  );
}
