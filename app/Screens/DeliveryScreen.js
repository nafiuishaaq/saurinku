import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const DeliveryItem = ({ delivery, onPress }) => {
  const statusConfig = {
    'in-transit': {
      bgColor: '#FFF4ED',
      textColor: '#EA580C',
      label: 'In-Transit',
    },
    delivered: {
      bgColor: '#ECFDF5',
      textColor: '#059669',
      label: 'Delivered',
    },
    cancelled: {
      bgColor: '#FEF2F2',
      textColor: '#DC2626',
      label: 'Cancelled',
    },
  };

  const config = statusConfig[delivery.status];

  return (
    <Pressable
      onPress={() => onPress(delivery)}
      style={styles.deliveryCard}
      android_ripple={{ color: '#E5E7EB' }}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.dateText}>{delivery.date}</Text>
          <Text style={styles.orderIdText}>#{delivery.orderId}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
          <Text style={[styles.statusText, { color: config.textColor }]}>
            {config.label}
          </Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, styles.pickupDot]} />
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>{delivery.pickup}</Text>
            <Text style={styles.timeText}>{delivery.pickupTime}</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <View style={[styles.locationDot, styles.destinationDot]} />
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>{delivery.destination}</Text>
            <Text style={styles.timeText}>{delivery.destinationTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.providerText}>{delivery.provider}</Text>
        <Text style={styles.priceText}>₦{delivery.price}</Text>
      </View>
    </Pressable>
  );
};

export default function MyDeliveries({
  navigation = useNavigation(),
  deliveries = [
    {
      id: '1',
      date: 'Today, 10:20 AM',
      orderId: 'S6AJ-10KS18F',
      status: 'in-transit',
      pickup: '123 Main St, Lagos',
      pickupTime: 'Picked-up 9:45 - 10:00',
      destination: '456 Oba Ave, Surulere',
      destinationTime: 'Dropped-off 4:30 - 5:00',
      provider: 'Saurinku',
      price: '631.75',
    },
    {
      id: '2',
      date: 'Yesterday, 3:45 PM',
      orderId: 'S6AJ-3H40SX',
      status: 'delivered',
      pickup: '789 Palm Rd, Ikeja',
      pickupTime: 'Picked-up 2:15 - 2:30',
      destination: '101 Marina Rd, Victoria Island',
      destinationTime: 'Dropped-off 3:20 - 3:45',
      provider: 'Saurinku',
      price: '824.60',
    },
    {
      id: '3',
      date: '2 days ago',
      orderId: 'S6AJ-5H41M4',
      status: 'cancelled',
      pickup: '244 Block Rd, Surulere',
      pickupTime: 'Scheduled 9:00 - 9:15',
      destination: '330 Crescent St, GRA/Ikeja',
      destinationTime: 'Scheduled 10:00 - 10:30',
      provider: 'Saurinku',
      price: '524.30',
    },
  ],
  onDeliveryPress = (delivery) => console.log('Delivery pressed:', delivery),
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filterDeliveries = () => {
    if (activeTab === 'all') return deliveries;
    if (activeTab === 'active')
      return deliveries.filter((d) => d.status === 'in-transit');
    if (activeTab === 'completed')
      return deliveries.filter((d) => d.status === 'delivered');
    if (activeTab === 'cancelled')
      return deliveries.filter((d) => d.status === 'cancelled');
    return deliveries;
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredDeliveries = filterDeliveries();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => {
            navigation.goBack();
            
          }}>
             <Ionicons name="arrow-back" size={22} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>My Deliveries</Text>
          <Pressable style={styles.searchButton}>
            <Text style={styles.searchIcon}>
              <EvilIcons name="search" size={24} color="#6B7280" />
            </Text>
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[
                styles.tab,
                activeTab === tab.id ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id
                    ? styles.activeTabText
                    : styles.inactiveTabText,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Deliveries List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((delivery) => (
            <DeliveryItem
              key={delivery.id}
              delivery={delivery}
              onPress={onDeliveryPress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No deliveries found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  inactiveTab: {
    backgroundColor: '#F3F4F6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 4,
    marginRight: 12,
  },
  pickupDot: {
    borderColor: '#10B981',
  },
  destinationDot: {
    borderColor: '#F97316',
  },
  locationDetails: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  providerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});