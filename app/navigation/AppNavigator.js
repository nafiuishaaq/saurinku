// app/navigation/AppNavigator.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../app/context/AuthContext';

// Auth Screens
import LoginScreen from "../Screens/LoginScreen";
import OnboardingScreen from "../Screens/OnboardingScreen";
import SplashScreen from "../Screens/SplashScreen";

// Role-based Navigators
import AdminNavigator from './roles/AdminNavigator';
import CompanyNavigator from './roles/CompanyNavigator';
import CustomerNavigator from './roles/CustomerNavigator';
import RiderNavigator from './roles/RiderNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, isLoading, hasSeenOnboarding } = useAuth();

  // Show loading screen while checking auth status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // If user is authenticated, route to appropriate role navigator
  if (user) {
    switch (user.role) {
      case 'customer':
        return <CustomerNavigator />;
      case 'rider':
        return <RiderNavigator />;
      case 'company':
        return <CompanyNavigator />;
      case 'admin':
        return <AdminNavigator />;
      default:
        return <CustomerNavigator />;
    }
  }

  // If not authenticated, show auth flow
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!hasSeenOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}