import { Container } from "./styles";

interface IStepsProps {
  step: "first" | "second" | "third";
  currentStep: "first" | "second" | "third";
}

export function Steps({ step, currentStep }: IStepsProps) {
  return <Container step={step} currentStep={currentStep} />
}
