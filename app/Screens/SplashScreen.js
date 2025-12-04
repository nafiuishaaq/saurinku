// app/Screens/SplashScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen() {
  const navigation = useNavigation();
  const { hasSeenOnboarding, isLoading } = useAuth();

  useEffect(() => {
    // Wait a moment then navigate
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (hasSeenOnboarding) {
          navigation.replace('Login');
        } else {
          navigation.replace('Onboarding');
        }
      }
    }, 2000); // 2 second splash screen

    return () => clearTimeout(timer);
  }, [hasSeenOnboarding, isLoading, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saurinku Group</Text>
      <Text style={styles.subtitle}>Welcome</Text>
      <ActivityIndicator size="large" color="#fefffeff" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12ff85ff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#fffefeff',
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});