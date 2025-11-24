import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import "react-native-maps";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

export default function DashboardScreen() {
    const [deliveryData, setDeliveryData] = useState({
      arrivalTime: 8,
      status: 'On the way',
      driver: {
        name: 'Nafiu Ishaq',
        vehicle: 'Ceegee',
        plate: 'HS12UJ1234',
        rating: 4.8,
        avatar: 'NI'
      },
      pickup: {
        latitude: 9.057,
        longitude: 7.451,
        address: 'Pickup Location'
      },
      delivery: {
        latitude: 9.058,
        longitude: 7.452,
        address: 'Current Location'
      },
      dropoff: {
        latitude: 9.059,
        longitude: 7.453,
        address: 'Your Location'
      }
    });
  
    const mapRegion = {
      latitude: 9.058,
      longitude: 7.452,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  
    const routeCoordinates = [
      deliveryData.pickup,
      deliveryData.delivery,
      deliveryData.dropoff,
    ];

    
  const navigation = useNavigation();
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 30 }}>
      
      {/* Header */}
      <View style={styles.header}>
          <Pressable onPress={() => {
            navigation.navigate('Profile');
          }}>
              <View>
                <View style={styles.profileContainer}>
                  <Image 
                    source={require('../../img/avatar.jpg')} 
                    style={ styles.profileImage } 
                  />
                  <View>
                    <Text style={styles.greeting}>Hello, Nafiu!</Text>
                    <Text style={styles.appName}>Saurinku</Text>
                  </View>
                </View>
            </View>
          </Pressable>
          <View style={styles.notificationIcon}>
            {/* Replace with actual icon */}
            <Text>🔔</Text>
          </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewDelivery')}>
        <Text style={styles.buttonText}>Book a New Delivery</Text>
      </TouchableOpacity>

      {/* Active Deliveries */}
      <Text style={styles.sectionTitle}>Active Deliveries</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Example Delivery Card */}
        <Pressable onPress={() => {
          navigation.navigate('TrackDelivery');
        }}>
          <View style={styles.card}>
          {/* Replace with Map Image */}
          {/* <Image 
            source={require('../../img/bg.jpg')} 
            style={styles.mapImage} 
            resizeMode="cover"
          /> */}
           {/* Map */}
    <View style={styles.mapImage}>
        <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        
      >

        {/* Route Polyline */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#4af95fff"
          strokeWidth={4}
          lineDashPattern={[8, 8]}
        />

        {/* Pickup Marker */}
        <Marker coordinate={deliveryData.pickup}>
          <View style={[styles.markerContainer, { backgroundColor: '#22c55e' }]}>
            <Icon name="map-pin" size={20} color="white" />
          </View>
        </Marker>

        {/* Driver Current Location Marker */}
        <Marker coordinate={deliveryData.delivery}>
          <View style={[styles.markerContainer, { backgroundColor: '#2563eb' }]}>
            <Icon name="navigation" size={20} color="white" />
          </View>
        </Marker>

        {/* Dropoff Marker */}
        <Marker coordinate={deliveryData.dropoff}>
          <View style={[styles.markerContainer, { backgroundColor: '#ef4444' }]}>
            <Icon name="map-pin" size={20} color="white" />
          </View>
        </Marker>
      
      </MapView>
    </View>
          <Text style={styles.status}>In Transit</Text>
          <Text style={styles.tracking}>Tracking ID: XYZ-123</Text>
          <Text style={styles.eta}>ETA: 4:30 PM</Text>
        </View>
        </Pressable>

        <Pressable>
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
        </Pressable>

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
  map: {
    width: '100%',
    height: 120,
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
