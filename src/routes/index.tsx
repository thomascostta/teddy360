import { NavigationContainer } from "@react-navigation/native"

import { PublicRoutes } from "./public.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <PublicRoutes />
    </NavigationContainer>
  );
}
