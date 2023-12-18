import { useTheme } from "styled-components/native";

import { Container, BackgroundContainer } from "./styles";

import { useAuth } from "../../hook/auth";

import { SignInForm } from "../../components/templates/SignInForm";
import { SignInNewUserForm } from "../../components/templates/SignInNewUserForm";
import { ForgotPassword } from "../../components/templates/ForgotPassword";

export function InitialScreen() {
  const theme = useTheme();
  const { isUserVisible } = useAuth();

  const renderContent = () => {
    switch (isUserVisible) {
      case "newLogin":
        return <SignInForm />;
      case "anotherUser":
        return <SignInNewUserForm />;
      case "forgotPassword":
        return <ForgotPassword />;
      default:
        return null;
    }
  };

  return (
    <BackgroundContainer source={theme.images.background}>
      <Container>{renderContent()}</Container>
    </BackgroundContainer>
  );
}
