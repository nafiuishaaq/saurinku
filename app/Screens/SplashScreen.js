import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../img/image1.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Saurinku</Text>
        <Text style={styles.subtitle}>Delivery, Simplified</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  title: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  subtitle: {
    color: "#666",
    marginTop: 5,
  },
});
