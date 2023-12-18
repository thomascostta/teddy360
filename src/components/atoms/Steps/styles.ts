import { css } from "styled-components";
import styled from "styled-components/native";

interface IStepsStyleProps {
  step: "first" | "second" | "third";
  currentStep: "first" | "second" | "third";
}

const handleBackgroundColorStatus = (
  step: "first" | "second" | "third",
  currentStep: "first" | "second" | "third"
) => {
  if (currentStep === step) {
    return css`
      width: 103.5px;
      height: 4px;
      border-radius: 16px;
      background-color: ${({ theme }) => theme.colors.orange.secondary};
    `;
  } else if (
    (currentStep === "first" && step === "second") ||
    (currentStep === "second" && step === "third")
  ) {
    return css`
      width: 103.5px;
      height: 4px;
      border-radius: 16px;
      background-color: ${({ theme }) => theme.colors.white.primary};
    `;
  } else {
    return css`
      width: 103.5px;
      height: 4px;
      border-radius: 16px;
      background-color: ${({ theme }) => theme.colors.white.third};
    `;
  }
};

export const Container = styled.View<IStepsStyleProps>`
  ${({ step, currentStep }) => handleBackgroundColorStatus(step, currentStep)}
`;
