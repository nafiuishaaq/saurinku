import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

const MenuItem = ({ icon, title, hasArrow = true, onPress }) => (
  <Pressable
    style={styles.menuItem}
    onPress={onPress}
    android_ripple={{ color: '#F3F4F6' }}
  >
    <View style={styles.menuLeft}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    {hasArrow && <Text style={styles.arrow}>›</Text>}
  </Pressable>
);

const MenuItemWithToggle = ({ icon, title, value, onValueChange }) => (
  <View style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
      thumbColor={value ? '#22c535ff' : '#F3F4F6'}
      ios_backgroundColor="#D1D5DB"
    />
  </View>
);

export default function ProfilePage({
  user = {
    name: 'Nafiu Ishaq',
    email: 'nafiu@example.com',
    avatar: require('../../img/avatar.jpg'),
  },
  onBack = () => console.log('Back pressed'),
  onEditProfile = () => console.log('Edit profile'),
  onPersonalDetails = () => console.log('Personal Details'),
  onVehicleInfo = () => console.log('Vehicle Information'),
  onPayoutMethods = () => console.log('Payout Methods'),
  onPushNotifications = () => console.log('Push Notifications'),
  onPrivacySecurity = () => console.log('Privacy & Security'),
  onHelpCenter = () => console.log('Help Center'),
  onLogout = () => console.log('Logout'),
}) {
  const navigation = useNavigation();
  const [availabilityStatus, setAvailabilityStatus] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => {
          navigation.goBack();
        }} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Image source={user.avatar} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            
            <Pressable onPress={onEditProfile} style={styles.editButton}>
              <View style={styles.editIconContainer}>
                <Text style={styles.editIcon}>
                  <Ionicons name="pencil" size={16} color="#FFFFFF" />
                </Text>
              </View>
            </Pressable>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Availability Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability Status</Text>
          <View style={styles.card}>
            <MenuItemWithToggle
              icon="🟢"
              title="Available"
              value={availabilityStatus}
              onValueChange={setAvailabilityStatus}
            />
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.card}>
            <MenuItem
              icon="👤"
              title="Personal Details"
              onPress={onPersonalDetails}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="🚗"
              title="Vehicle Information"
              onPress={onVehicleInfo}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="💳"
              title="Payout Methods"
              onPress={onPayoutMethods}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.card}>
            <MenuItemWithToggle
              icon="🔔"
              title="Push Notifications"
              value={pushNotificationsEnabled}
              onValueChange={setPushNotificationsEnabled}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="🔒"
              title="Privacy & Security"
              onPress={onPrivacySecurity}
            />
            <View style={styles.divider} />
            <MenuItem icon="❓" title="Help Center" onPress={onHelpCenter} />
          </View>
        </View>

        {/* Logout Button */}
        <Pressable
          style={styles.logoutButton}
          onPress={onLogout}
          android_ripple={{ color: '#FEE2E2' }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

        <View style={styles.bottomSpacer} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#dbf5c0ff',
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'relative',
    borderRadius: 11,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  editIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editIcon: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  avatarContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  menuTitle: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 24,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 68,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  bottomSpacer: {
    height: 32,
  },
});