import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NewDeliveryScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Delivery</Text>
        <View style={{ width: 22 }} /> 
      </View>

      {/* Pickup Information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pickup Information</Text>

        <TextInput placeholder="Enter pickup address" style={styles.input} />
        <TextInput placeholder="Enter sender's name" style={styles.input} />
        <TextInput
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Dropoff Information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dropoff Information</Text>

        <TextInput placeholder="Enter dropoff address" style={styles.input} />
        <TextInput placeholder="Enter recipient's name" style={styles.input} />
        <TextInput
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Package Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Package Details</Text>

        <TextInput placeholder="Document / Package" style={styles.input} />

        <Text style={styles.label}>Approx Weight</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="0.0 - 2kg"
            style={[styles.input, styles.rowInput]}
          />
          <TextInput
            placeholder="L x W x H"
            style={[styles.input, styles.rowInput]}
          />
        </View>

        <TextInput
          placeholder="e.g. 1 brown short dress"
          style={styles.input}
        />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue to Summary</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 16,
  },

  /* Header */
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  /* Cards */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },

  /* Inputs */
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
    fontSize: 12,
    color: "#6B6B6B",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    width: "48%",
  },

  /* Button */
  button: {
    backgroundColor: "#0066FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
