import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "../../context/themecontext";

export default function NewCard({ navigation }) {
  const { theme } = useTheme();
  const [cardName, setCardName] = useState("Shady Mohammed");
  const [cardNumber, setCardNumber] = useState("1924 5489 1028 3388");
  const [expiry, setExpiry] = useState("03/30");
  const [cvv, setCvv] = useState("190");

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Card</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Card Visual */}
      <View style={[styles.cardVisual, { backgroundColor: theme.primary }]}>
        <View style={styles.cardTop}>
          <View>
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Balance</Text>
            <Text style={[styles.balance, { color: "#FFF" }]}>$1299.15</Text>
          </View>
          <Text style={{ fontSize: 30 }}>💳</Text>
        </View>
        <Text style={[styles.cardNumber, { color: "rgba(255,255,255,0.7)" }]}>
          **** **** 8399 3241
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 }}>11/22</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
          placeholder="Card Holder Name"
          placeholderTextColor={theme.inputPlaceholder}
          value={cardName}
          onChangeText={setCardName}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
          placeholder="Card Number"
          placeholderTextColor={theme.inputPlaceholder}
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
            placeholder="MM/YY"
            placeholderTextColor={theme.inputPlaceholder}
            value={expiry}
            onChangeText={setExpiry}
          />
          <TextInput
            style={[styles.input, styles.halfInput, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
            placeholder="CVV"
            placeholderTextColor={theme.inputPlaceholder}
            value={cvv}
            onChangeText={setCvv}
            keyboardType="number-pad"
            secureTextEntry
          />
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.addButtonText}>Add New Card</Text>
      </TouchableOpacity>
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
  cardVisual: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 20,
    height: 180,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  balance: { fontSize: 28, fontWeight: "700", marginTop: 4 },
  cardNumber: { fontSize: 14, marginTop: 40, letterSpacing: 2 },
  form: { paddingHorizontal: 20, marginTop: 32, gap: 16 },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  row: { flexDirection: "row", gap: 12 },
  halfInput: { flex: 1 },
  addButton: {
    marginHorizontal: 20,
    marginTop: "auto",
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  addButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});