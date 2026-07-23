import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../context/themecontext";

export default function Booking({ navigation, route }) {
  const { theme } = useTheme();
  const [guests, setGuests] = useState(2);
  const [dates, setDates] = useState({
    checkIn: "Dec 15",
    checkOut: "Dec 19",
    nights: 5,
  });

  const hotel = route.params?.hotel || {
    name: "Royale President Hotel",
    location: "Paris, France",
    pricePerNight: 100,
  };

  const total = hotel.pricePerNight * dates.nights;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.iconBtn, { backgroundColor: theme.backgroundSecondary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 18, color: theme.text }}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Hotel Card */}
        <View style={[styles.hotelCard, { backgroundColor: theme.card }]}>
          <View style={[styles.hotelImage, { backgroundColor: theme.backgroundSecondary }]}>
            <Text style={{ fontSize: 40 }}>🏨</Text>
          </View>
          <View style={styles.hotelInfo}>
            <Text style={[styles.hotelName, { color: theme.text }]}>{hotel.name}</Text>
            <Text style={[styles.hotelLocation, { color: theme.textSecondary }]}>
              📍 {hotel.location}
            </Text>
          </View>
        </View>

        {/* Date Selection */}
        <TouchableOpacity
          style={[styles.dateCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => navigation.navigate("SelectDate", { dates, setDates })}
        >
          <View style={styles.dateItem}>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Check in</Text>
            <Text style={[styles.dateValue, { color: theme.text }]}>{dates.checkIn}</Text>
          </View>
          <View style={[styles.dateArrow, { backgroundColor: theme.primaryLight }]}>
            <Text style={{ color: theme.primary, fontSize: 16 }}>→</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Check out</Text>
            <Text style={[styles.dateValue, { color: theme.text }]}>{dates.checkOut}</Text>
          </View>
        </TouchableOpacity>

        {/* Guest Counter */}
        <View style={[styles.guestCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View>
            <Text style={[styles.guestTitle, { color: theme.text }]}>Guest</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
              {guests} Adults
            </Text>
          </View>
          <View style={styles.counter}>
            <TouchableOpacity
              style={[styles.counterBtn, { backgroundColor: theme.backgroundSecondary }]}
              onPress={() => setGuests(Math.max(1, guests - 1))}
            >
              <Text style={{ color: theme.text, fontSize: 20 }}>−</Text>
            </TouchableOpacity>
            <Text style={[styles.counterValue, { color: theme.text }]}>{guests}</Text>
            <TouchableOpacity
              style={[styles.counterBtn, { backgroundColor: theme.primary }]}
              onPress={() => setGuests(guests + 1)}
            >
              <Text style={{ color: "#FFF", fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
          <View style={styles.summaryRow}>
            <Text style={{ color: theme.textSecondary }}>
              ${hotel.pricePerNight} x {dates.nights} nights
            </Text>
            <Text style={{ color: theme.text, fontWeight: "600" }}>${total}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.summaryRow}>
            <Text style={{ color: theme.text, fontWeight: "700", fontSize: 16 }}>Total</Text>
            <Text style={[styles.totalPrice, { color: theme.primary }]}>${total}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Continue Button */}
      <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("SelectDate", { hotel, guests, dates })}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  content: { paddingHorizontal: 20 },
  hotelCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  hotelImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  hotelInfo: { marginLeft: 12, justifyContent: "center" },
  hotelName: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  hotelLocation: { fontSize: 13 },
  dateCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  dateItem: { flex: 1 },
  dateValue: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  dateArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  guestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  guestTitle: { fontSize: 16, fontWeight: "600" },
  counter: { flexDirection: "row", alignItems: "center" },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  counterValue: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: "center",
  },
  summaryCard: { padding: 16, borderRadius: 16, marginBottom: 16 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  divider: { height: 1, marginVertical: 8 },
  totalPrice: { fontSize: 20, fontWeight: "700" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 0.5,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  continueText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});