import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import NewDelivery from "../Screens/NewDelivery";
import OnboardingScreen from "../Screens/OnboardingScreen";
import SplashScreen from "../Screens/SplashScreen";
import TrackDelivery from "../Screens/TrackDelivery";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TrackDelivery" component={TrackDelivery} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewDelivery" component={NewDelivery} />
      </Stack.Navigator>
  );
}
