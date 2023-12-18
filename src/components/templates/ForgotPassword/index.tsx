import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../../hook/auth";

import { Container, ContentForm, FooterContainer } from "./styles";
import { FooterInfo } from "../../atoms/FooterInfo";
import { FirstStepForgotPassword } from "../../organisms/FirstStepForgotPassword";
import { SecondStepForgotPassword } from "../../organisms/SecondStepForgotPassword";
import { ThirdStepForgotPassword } from "../../organisms/ThirdStepForgotPassword";

export function ForgotPassword() {
  const { isStepsForgotPassword } = useAuth();

  const renderStepComponent = () => {
    switch (isStepsForgotPassword) {
      case "first":
        return <FirstStepForgotPassword />;
      case "second":
        return <SecondStepForgotPassword />;
      case "third":
        return <ThirdStepForgotPassword />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      extraScrollHeight={150}
      enableOnAndroid
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContentForm>{renderStepComponent()}</ContentForm>
          <FooterContainer>
            <FooterInfo />
          </FooterContainer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
