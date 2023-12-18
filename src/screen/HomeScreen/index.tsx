import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Container, BackgroundContainer } from "./styles";
import { ButtonPrimary } from "../../components/atoms/ButtonPrimary";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function HomeScreen() {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const theme = useTheme();

  return (
    <BackgroundContainer source={theme.images.background}>
      <Container>
        <ButtonPrimary
          label="Logout"
          style={{ width: 300 }}
          onPress={() => navigate("InitialStackPublic")}
        />
      </Container>
    </BackgroundContainer>
  );
}
