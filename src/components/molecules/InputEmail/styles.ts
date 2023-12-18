import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

interface IIsValidEmailProps {
  isValidEmail: boolean;
}

interface IMarginBottomProps {
  marginBottom: number;
}

export const Container = styled.View<IMarginBottomProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
`;

export const Content = styled.View<IIsValidEmailProps>`
  width: 100%;
  height: 48px;
  border-width: 2px;
  border-radius: 8px;
  border-color: ${({ theme, isValidEmail }) =>
    isValidEmail ? theme.colors.red.primary : theme.colors.white.secondary};
  padding: 6px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ContentAvatar = styled.View`
  width: 32px;
  height: 32px;
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.white.secondary,
}))`
  color: ${({ theme }) => theme.colors.white.primary};
  font-family: ${({ theme }) => theme.fontFamily.geologica_500};
  font-size: ${({ theme }) => theme.fontSizes._16}px;
  padding: 0 8px 0 8px;
  width: 90%;
`;
