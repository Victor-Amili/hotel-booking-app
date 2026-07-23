import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/themecontext";

export default function BookingSuccess({ navigation, route }) {
  const { theme } = useTheme();
  const booking = route.params?.booking || {};

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Decorative background dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, { backgroundColor: theme.primary, top: 60, left: 40, width: 12, height: 12 }]} />
        <View style={[styles.dot, { backgroundColor: theme.primary, top: 100, right: 50, width: 8, height: 8 }]} />
        <View style={[styles.dot, { backgroundColor: theme.primary, bottom: 200, left: 60, width: 10, height: 10 }]} />
        <View style={[styles.dot, { backgroundColor: theme.primary, bottom: 250, right: 40, width: 6, height: 6 }]} />
      </View>

      {/* Success Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        {/* Green Circle with Check */}
        <View style={[styles.successCircle, { backgroundColor: theme.primary }]}>
          <Text style={{ fontSize: 40, color: "#FFF" }}>✓</Text>
        </View>

        <Text style={[styles.congrats, { color: theme.primary }]}>Congratulations !</Text>
        <Text style={[styles.message, { color: theme.textSecondary }]}>
          Reservation completed successfully
        </Text>

        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("BookingListScreen")}
        >
          <Text style={styles.homeButtonText}>Go to Homepage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  dotsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dot: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.3,
  },
  card: {
    width: "100%",
    padding: 40,
    borderRadius: 24,
    alignItems: "center",
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  congrats: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
  homeButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});