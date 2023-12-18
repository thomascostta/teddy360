import { Container } from "./styles";
import { Steps } from "../../atoms/Steps";

interface IStepsFormProps {
  marginTop?: number;
  marginBotton?: number;
  steps: "first" | "second" | "third";
}

export function StepsForm({
  marginTop = 0,
  marginBotton = 0,
  steps = "first",
}: IStepsFormProps) {
  const stepsArray = ["first", "second", "third"];

  return (
    <Container marginTop={marginTop} marginBotton={marginBotton}>
      {stepsArray.map((step) => (
        <Steps key={step} step={steps} currentStep={step as "first" | "second" | "third"} />
      ))}
    </Container>
  );
}
