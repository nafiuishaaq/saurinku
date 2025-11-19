import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 30 }}>
      
      {/* Header */}
      <View style={styles.header}>
            <View>
                <View style={styles.profileContainer}>
                  <Image 
                    source={require('../../img/image1.png')} 
                    style={ styles.profileImage } 
                  />
                  <View>
                    <Text style={styles.greeting}>Hello, Nafiu!</Text>
                    <Text style={styles.appName}>Saurinku</Text>
                  </View>
                </View>
            </View>
          <View style={styles.notificationIcon}>
            {/* Replace with actual icon */}
            <Text>🔔</Text>
          </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book a New Delivery</Text>
      </TouchableOpacity>

      {/* Active Deliveries */}
      <Text style={styles.sectionTitle}>Active Deliveries</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Example Delivery Card */}
        <View style={styles.card}>
          {/* Replace with Map Image */}
          <Image 
            source={require('../../img/bg.jpg')} 
            style={styles.mapImage} 
            resizeMode="cover"
          />
          <Text style={styles.status}>In Transit</Text>
          <Text style={styles.tracking}>Tracking ID: XYZ-123</Text>
          <Text style={styles.eta}>ETA: 4:30 PM</Text>
        </View>

        <View style={styles.card}>
          {/* Replace with Map Image */}
          <Image 
            source={require('../../img/bg.jpg')} 
            style={styles.mapImage} 
            resizeMode="cover"
          />
          <Text style={styles.status}>Delivered</Text>
          <Text style={styles.tracking}>Tracking ID: XYZ-123</Text>
          <Text style={styles.eta}>ETA: 4:30 PM</Text>
        </View>

        {/* Add more cards as needed */}
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 10 },
  greeting: { fontSize: 16, color: '#333' },
  appName: { fontSize: 18, fontWeight: 'bold' },
  notificationIcon: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  card: { width: 250, backgroundColor: '#f3f4f6', borderRadius: 10, marginRight: 15, padding: 10 },
  mapImage: { width: '100%', height: 120, borderRadius: 8, marginBottom: 10 },
  status: { fontSize: 14, fontWeight: 'bold' },
  tracking: { fontSize: 12, color: '#555' },
  eta: { fontSize: 12, color: '#555' },
  profileContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
});
