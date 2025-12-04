// app/navigation/roles/RiderNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../Screens/DashboardScreen';
import DeliveryScreen from '../../Screens/DeliveryScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import SupportScreen from '../../Screens/SupportScreen';
import TrackDelivery from '../../Screens/TrackDelivery';

const Tab = createBottomTabNavigator();

export default function RiderNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Deliveries') {
            iconName = focused ? 'bicycle' : 'bicycle-outline';
          } else if (route.name === 'TrackDelivery') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Support') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#34C759',
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
        name="TrackDelivery" 
        component={TrackDelivery}
        options={{ tabBarLabel: 'Track' }}
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