import { useEffect } from "react";
import { useTheme } from "styled-components";
import { useNavigation, ParamListBase } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ContainerBackground, Container } from "./styles";

import LogoSVG from "../../assets/Logo.svg";

export function SplashScreen() {
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("InitialStackPublic");
  }

  useEffect(() => {
    let mounted = true;

    splashAnimation.value = withTiming(50, { duration: 1500 }, () => {
      if (mounted) {
        ("worklet");
        runOnJS(startApp)();
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const theme = useTheme();
  return (
    <ContainerBackground source={theme.images.background}>
      <Container>
        <Animated.View style={[brandStyle, { position: "absolute" }]}>
          <LogoSVG width={210.94} height={100} />
        </Animated.View>

        <Animated.View style={[logoStyle, { position: "absolute" }]}>
          <LogoSVG width={135} height={64} />
        </Animated.View>
      </Container>
    </ContainerBackground>
  );
}
