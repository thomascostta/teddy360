import { Container } from "./styles";
import LogoSVG from "../../../assets/Logo.svg";

export function Header() {
  return (
    <Container>
      <LogoSVG width={135} height={64} />
    </Container>
  );
}
