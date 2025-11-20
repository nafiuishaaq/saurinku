import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const TrackDelivery = () => {
    const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Map */}
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

      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => {
            navigation.goBack();
        }}>
          <Icon name="chevron-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Delivery</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="menu" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Map Control Buttons */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Icon name="navigation" size={20} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, { marginTop: 12 }]}>
          <Icon name="map-pin" size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Drag Handle */}
        <View style={styles.dragHandle} />

        {/* Arrival Time */}
        <View style={styles.arrivalSection}>
          <Text style={styles.arrivalText}>
            Arriving in <Text style={styles.arrivalTime}>{deliveryData.arrivalTime} mins</Text>
          </Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{deliveryData.status}</Text>
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.driverSection}>
          <View style={styles.driverInfo}>
            {/* Avatar */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{deliveryData.driver.avatar}</Text>
            </View>
            
            {/* Driver Details */}
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{deliveryData.driver.name}</Text>
              <Text style={styles.vehicleInfo}>
                {deliveryData.driver.vehicle} • {deliveryData.driver.plate}
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#eab308" style={styles.starIcon} />
            <Text style={styles.ratingText}>{deliveryData.driver.rating}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.messageButton}>
            <Icon name="message-square" size={20} color="#db2777" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.callButton}>
            <Icon name="phone" size={20} color="white" />
            <Text style={styles.callButtonText}>Call Driver</Text>
          </TouchableOpacity>
        </View>

        {/* Help Support */}
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>Need Help Support?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: width,
    height: height,
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
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 44,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  mapControls: {
    position: 'absolute',
    top: (StatusBar.currentHeight || 44) + 80,
    right: 16,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#d1d5db',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  arrivalSection: {
    marginBottom: 24,
  },
  arrivalText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  arrivalTime: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  driverSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#14b8a6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#6b7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fce7f3',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fbcfe8',
    gap: 8,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#db2777',
    marginLeft: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14b8a6',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  helpButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default TrackDelivery;