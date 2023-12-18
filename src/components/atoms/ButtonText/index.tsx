import { Container, Touchable, Title, Content } from "./styles";
import DoubleArrowSVG from "../../../assets/ArrowDouble.svg";

interface PropsButtonNewUser {
  marginTop?: number;
  marginBotton?: number;
  onPress: () => void;
  hasIcon?: boolean;
  label: string;
  hasIconToColorLabel?: boolean;
}

export function ButtonText({
  marginTop = 0,
  marginBotton = 0,
  hasIcon = false,
  onPress,
  label,
}: PropsButtonNewUser) {
  return (
    <Container marginTop={marginTop} marginBotton={marginBotton}>
      <Touchable onPress={onPress}>
        <Content>
          <Title hasIconToColorLabel={hasIcon}>{label}</Title>
          {hasIcon && (
            <DoubleArrowSVG height={13} width={13} style={{ marginLeft: 2 }} />
          )}
        </Content>
      </Touchable>
    </Container>
  );
}
