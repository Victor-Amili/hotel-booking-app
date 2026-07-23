import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../context/themecontext";

export default function BookingListScreen({ navigation }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("upcoming");

  const allBookings = {
    upcoming: [
      {
        id: "1",
        hotel: "President Hotel",
        location: "Paris, France",
        price: 35,
        rating: 4.8,
        reviews: "4.8(6,283 reviews)",
        date: "Jan 15-20, 2026",
      },
    ],
    completed: [
      {
        id: "2",
        hotel: "Palazzo Versace",
        location: "Rome, Italia",
        price: 40,
        rating: 4.8,
        reviews: "4.8(6,283 reviews)",
        date: "Dec 10-15, 2025",
      },
      {
        id: "3",
        hotel: "Martinez Cannes",
        location: "Rome, Italia",
        price: 50,
        rating: 4.8,
        reviews: "4.8(6,283 reviews)",
        date: "Nov 5-10, 2025",
      },
    ],
    canceled: [
      {
        id: "4",
        hotel: "Ocean View Resort",
        location: "Bali, Indonesia",
        price: 45,
        rating: 4.6,
        reviews: "4.6(3,200 reviews)",
        date: "Oct 1-5, 2025",
      },
    ],
  };

  const bookings = allBookings[activeTab];

  const tabs = [
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
    { key: "canceled", label: "Canceled" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Bookings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    activeTab === tab.key ? theme.primary : theme.backgroundSecondary,
                },
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={{
                  color: activeTab === tab.key ? "#FFF" : theme.textSecondary,
                  fontWeight: activeTab === tab.key ? "600" : "400",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Booking Cards */}
        {bookings.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ fontSize: 40 }}>📅</Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No {activeTab} bookings
            </Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={[styles.bookingCard, { backgroundColor: theme.card }]}
              onPress={() => navigation.navigate("HotelDetails", { hotel: booking })}
            >
              <View
                style={[
                  styles.imagePlaceholder,
                  { backgroundColor: theme.backgroundSecondary },
                ]}
              >
                <Text style={{ fontSize: 40 }}>🏨</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={[styles.hotelName, { color: theme.text }]}>
                  {booking.hotel}
                </Text>
                <Text style={[styles.hotelLocation, { color: theme.textSecondary }]}>
                  📍 {booking.location}
                </Text>
                <View style={styles.ratingRow}>
                  <Text style={{ color: theme.star }}>⭐ {booking.rating}</Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                    ({booking.reviews})
                  </Text>
                </View>
                <Text style={{ color: theme.textTertiary, fontSize: 12, marginTop: 4 }}>
                  {booking.date}
                </Text>
              </View>
              <View style={styles.priceColumn}>
                <Text style={[styles.price, { color: theme.primary }]}>
                  ${booking.price}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                  /night
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  content: { paddingHorizontal: 20 },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookingCard: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bookingInfo: { flex: 1, marginLeft: 12, justifyContent: "center" },
  hotelName: { fontSize: 15, fontWeight: "600", marginBottom: 4 },
  hotelLocation: { fontSize: 12, marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  priceColumn: { justifyContent: "center", alignItems: "flex-end" },
  price: { fontSize: 16, fontWeight: "700" },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: { marginTop: 16, fontSize: 16 },
});