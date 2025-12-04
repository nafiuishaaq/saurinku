// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useRole } from "../context/RoleContext";


// const { role } = useRole();



// const handleLogin = () => {
//   if (role === "customer") navigation.replace("Home");
//   if (role === "rider") navigation.replace("Dashboard"); // if you create it
//   if (role === "company") navigation.replace("CompanyDashboard");
//   if (role === "admin") navigation.replace("AdminPanel");
// };


// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//     const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* Logo/Icon */}
//       <View style={styles.logoContainer}>
//         <View style={styles.logo}>
//           <Ionicons name="bicycle" size={32} color="white" />
//         </View>
//       </View>

//       {/* Welcome Text */}
//       <Text style={styles.title}>Welcome, Rider!</Text>
//       <Text style={styles.subtitle}>Sign in and start delivery</Text>

//       {/* Rider ID Input */}
//       <Text style={styles.label}>Rider's ID / Email</Text>
//       <View style={styles.inputContainer}>
//         <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your Rider ID or Email"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />
//       </View>

//       {/* Password Input */}
//       <Text style={styles.label}>Password</Text>
//       <View style={styles.inputContainer}>
//         <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your Password"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Ionicons 
//             name={showPassword ? "eye-outline" : "eye-off-outline"} 
//             size={20} 
//             color="#999" 
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Forgot Password */}
//       <TouchableOpacity style={styles.forgotPassword}>
//         <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       {/* Login Button */}
//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>

//       {/* Divider */}
//       <View style={styles.dividerContainer}>
//         <View style={styles.divider} />
//         <Text style={styles.dividerText}>Sign in with biometrics</Text>
//         <View style={styles.divider} />
//       </View>

//       {/* Register Link */}
//       <View style={styles.registerContainer}>
//         <Text style={styles.registerText}>Don't have an account? </Text>
//         <TouchableOpacity>
//           <Text style={styles.registerLink}>Register Here</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//     paddingTop: 60,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   logo: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#000',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 32,
//   },
//   label: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 16,
//     height: 50,
//   },
//   inputIcon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 14,
//     color: '#000',
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 24,
//   },
//   forgotPasswordText: {
//     color: '#007AFF',
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 8,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   dividerText: {
//     marginHorizontal: 12,
//     fontSize: 12,
//     color: '#999',
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   registerText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   registerLink: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '600',
//   },
// });
// app/Screens/LoginScreen.js
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer');
  const { login } = useAuth();

  const roles = [
    { value: 'customer', label: 'Customer', color: '#007AFF' },
    { value: 'rider', label: 'Rider', color: '#34C759' },
    { value: 'company', label: 'Company', color: '#FF9500' },
    { value: 'admin', label: 'Admin', color: '#FF3B30' }
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    const result = await login(email, password, selectedRole);
    
    if (result.success) {
      // Navigation is handled automatically by AppNavigator
    } else {
      Alert.alert('Login Failed', result.error || 'Please try again');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Text style={styles.label}>Select Role (Dev Mode)</Text>
            <View style={styles.roleContainer}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  style={[
                    styles.roleButton,
                    selectedRole === role.value && {
                      backgroundColor: role.color,
                      borderColor: role.color
                    }
                  ]}
                  onPress={() => setSelectedRole(role.value)}
                >
                  <Text
                    style={[
                      styles.roleText,
                      selectedRole === role.value && styles.roleTextActive
                    ]}
                  >
                    {role.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: roles.find(r => r.value === selectedRole)?.color }
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login as {selectedRole}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContent: {
    flexGrow: 1
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center'
  },
  form: {
    width: '100%'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9'
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10
  },
  roleButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  roleTextActive: {
    color: '#fff'
  },
  loginButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: 'center'
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14
  }
});