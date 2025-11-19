import { Animated, StyleSheet, View } from "react-native";

export default function Paginator({ data, scrollX }) {
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * 300, i * 300, (i + 1) * 300];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: "clamp",
        });

        return <Animated.View key={i} style={[styles.dot, { width: dotWidth }]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B00",
    marginHorizontal: 5,
  },
});
