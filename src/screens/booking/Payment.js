import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { CreditCard, Wallet, Smartphone, ShieldCheck } from 'lucide-react-native';
import { useTheme } from "../../context/themecontext";

export default function Payment({ navigation, route }) {
  const { theme } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState("card");

  const booking = route.params || {
    hotel: { name: "Royale President Hotel", pricePerNight: 100 },
    nights: 5,
    guests: 2,
    total: 500,
  };

const methods = [
  { 
    id: "paypal", 
    name: "Paypal", 
    icon: <Wallet size={24} color={theme.primary} /> 
  },
  { 
    id: "google", 
    name: "Google Pay", 
    icon: <Smartphone size={24} color={theme.primary} /> 
  },
  { 
    id: "apple", 
    name: "Apple Pay", 
    icon: <ShieldCheck size={24} color={theme.primary} /> 
  },
  {
    id: "card",
    name: "Pay with Debit/Credit Card",
    icon: <CreditCard size={24} color={theme.primary} />,
    cardNumber: "**** **** **** 4679",
  },
];
      

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Methods</Text>

        {/* Payment Methods */}
        {methods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              {
                backgroundColor: theme.card,
                borderColor: selectedMethod === method.id ? theme.primary : theme.border,
                borderWidth: selectedMethod === method.id ? 2 : 1,
              },
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodLeft}>
              <Text style={{ fontSize: 24 }}>{method.icon}</Text>
              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: theme.text, fontWeight: "500" }}>{method.name}</Text>
                {method.cardNumber && (
                  <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                    {method.cardNumber}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={[
                styles.radio,
                {
                  borderColor: selectedMethod === method.id ? theme.primary : theme.border,
                  backgroundColor: selectedMethod === method.id ? theme.primary : "transparent",
                },
              ]}
            >
              {selectedMethod === method.id && (
                <Text style={{ color: "#FFF", fontSize: 12 }}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Add New Card */}
        <TouchableOpacity
          style={[styles.addCardBtn, { borderColor: theme.primary }]}
          onPress={() => navigation.navigate("NewCard")}
        >
          <Text style={{ color: theme.primary, fontWeight: "600" }}>+ Add New Card</Text>
        </TouchableOpacity>

        {/* Order Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.text }]}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={{ color: theme.textSecondary }}>{booking.hotel.name}</Text>
            <Text style={{ color: theme.text }}>${booking.total}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ color: theme.textSecondary }}>Service fee</Text>
            <Text style={{ color: theme.text }}>$0</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.summaryRow}>
            <Text style={{ color: theme.text, fontWeight: "700" }}>Total</Text>
            <Text style={[styles.totalPrice, { color: theme.primary }]}>${booking.total}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Continue Button */}
      <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("BookingSuccess", { booking })}
        >
          <Text style={styles.continueText}>Pay ${booking.total}</Text>
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
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  methodLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  addCardBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    marginTop: 8,
  },
  summaryCard: { padding: 16, borderRadius: 16, marginTop: 20 },
  summaryTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
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