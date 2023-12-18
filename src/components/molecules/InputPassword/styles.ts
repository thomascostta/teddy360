import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from "react-native";

interface IMarginBottomProps {
  marginBottom: number;
}

export const Container = styled.View<IMarginBottomProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
`;

export const Content = styled.View`
  width: 100%;
  height: 48px;
  border-width: 2px;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.colors.white.secondary};
  padding: 0 12px 0 12px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.white.secondary,
}))`
  color: ${({ theme }) => theme.colors.white.primary};
  font-family: ${({ theme }) => theme.fontFamily.geologica_500};
  font-size: ${({ theme }) => theme.fontSizes._16}px;
  width: 93%;
`;

export const ChangePasswordVisibilityButton = styled(TouchableOpacity)`
  justify-content: center;
  padding-left: 5px;
`;
