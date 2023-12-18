import { TextInputProps } from "react-native";
import { Avatar } from "../../atoms/Avatar";
import { LabelText } from "../../atoms/LabelText";
import { Container, Content, ContentAvatar, Input } from "./styles";

interface ITextInputPropsProps extends TextInputProps {
  isValidEmail: boolean;
  marginBottom?: number;
}

export function InputEmail({
  isValidEmail,
  marginBottom = 0,
  ...rest
}: ITextInputPropsProps) {
  const avatarFake = require("../../../assets/Avatar.png");

  return (
    <Container marginBottom={marginBottom}>
      <LabelText text="E-mail" />
      <Content isValidEmail={isValidEmail}>
        <ContentAvatar>
          <Avatar source={avatarFake} />
        </ContentAvatar>
        <Input {...rest} />
      </Content>
    </Container>
  );
}
