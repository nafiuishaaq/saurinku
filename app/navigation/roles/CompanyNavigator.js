// app/navigation/roles/CompanyNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../Screens/DashboardScreen';
import DeliveryScreen from '../../Screens/DeliveryScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import ReportIssueScreen from '../../Screens/ReportIssueScreen';
import SupportScreen from '../../Screens/SupportScreen';

const Tab = createBottomTabNavigator();

export default function CompanyNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Deliveries') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'ReportIssue') {
            iconName = focused ? 'warning' : 'warning-outline';
          } else if (route.name === 'Support') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF9500',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60
        }
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Deliveries" 
        component={DeliveryScreen}
        options={{ tabBarLabel: 'Deliveries' }}
      />
      <Tab.Screen 
        name="ReportIssue" 
        component={ReportIssueScreen}
        options={{ tabBarLabel: 'Report Issue' }}
      />
      <Tab.Screen 
        name="Support" 
        component={SupportScreen}
        options={{ tabBarLabel: 'Support' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}