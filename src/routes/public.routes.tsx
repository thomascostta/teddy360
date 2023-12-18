import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SplashScreen } from "../screen/SplashScreen";
import { InitialScreen } from "../screen/InitialScreen";
import { HomeScreen } from "../screen/HomeScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashStackPublic">
      <Screen name="SplashStackPublic" component={SplashScreen} />
      <Screen name="InitialStackPublic" component={InitialScreen} />
      <Screen name="HomeStackPublic" component={HomeScreen} />
    </Navigator>
  );
}
