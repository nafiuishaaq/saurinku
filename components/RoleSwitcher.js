// app/components/RoleSwitcher.js
// This is a development helper component that can be added to any screen
// to quickly switch between roles without logging out

import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../app/context/AuthContext';

export default function RoleSwitcher() {
  const [visible, setVisible] = useState(false);
  const { user, switchRole } = useAuth();

  const roles = [
    { value: 'customer', label: 'Customer', color: '#007AFF' },
    { value: 'rider', label: 'Rider', color: '#34C759' },
    { value: 'company', label: 'Company', color: '#FF9500' },
    { value: 'admin', label: 'Admin', color: '#FF3B30' }
  ];

  const handleRoleSwitch = async (role) => {
    await switchRole(role);
    setVisible(false);
  };

  // Only show in development
  if (__DEV__ === false) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.floatingButtonText}>🔧</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Switch Role (Dev Mode)</Text>
            <Text style={styles.currentRole}>
              Current: {user?.role}
            </Text>

            {roles.map((role) => (
              <TouchableOpacity
                key={role.value}
                style={[
                  styles.roleOption,
                  { borderLeftColor: role.color, borderLeftWidth: 4 },
                  user?.role === role.value && styles.activeRole
                ]}
                onPress={() => handleRoleSwitch(role.value)}
              >
                <Text style={styles.roleLabel}>{role.label}</Text>
                {user?.role === role.value && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999
  },
  floatingButtonText: {
    fontSize: 24
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  currentRole: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20
  },
  roleOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeRole: {
    backgroundColor: '#e8f4ff'
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600'
  },
  checkmark: {
    fontSize: 20,
    color: '#007AFF'
  },
  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center'
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333'
  }
});