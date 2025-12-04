// app/navigation/roles/CustomerNavigator.js
import DashboardScreen from '@/app/Screens/DashboardScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import NewDelivery from '../../Screens/NewDelivery';
import ProfileScreen from '../../Screens/ProfileScreen';
import SupportScreen from '../../Screens/SupportScreen';
import TrackDelivery from '../../Screens/TrackDelivery';

const Tab = createBottomTabNavigator();

export default function CustomerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NewDelivery') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'TrackDelivery') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Support') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="NewDelivery" 
        component={NewDelivery}
        options={{ tabBarLabel: 'New Delivery' }}
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