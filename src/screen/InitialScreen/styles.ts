import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import { Platform } from "react-native";

export const BackgroundContainer = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;
export const Container = styled.View`
  flex: 1;
/*   padding: 0px 32px 0 32px; */
  top: ${Platform.OS === "android" ? 40 : 50}px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 48px;
  height: 612px;
  flex-direction: row;
  gap: 8px;
`;
