import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../context/themecontext";

export default function SelectDate({ navigation, route }) {
  const { theme } = useTheme();
  const [selectedStart, setSelectedStart] = useState(15);
  const [selectedEnd, setSelectedEnd] = useState(19);
  const [guests, setGuests] = useState(5);
  const [currentMonth, setCurrentMonth] = useState("December 2024");

  const hotel = route.params?.hotel || { pricePerNight: 100 };
  const nights = selectedEnd - selectedStart;
  const total = hotel.pricePerNight * nights;

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const isInRange = (day) => day >= selectedStart && day <= selectedEnd;
  const isStart = (day) => day === selectedStart;
  const isEnd = (day) => day === selectedEnd;

  const handleDayPress = (day) => {
    if (day < selectedStart) {
      setSelectedStart(day);
    } else if (day > selectedEnd) {
      setSelectedEnd(day);
    } else {
      setSelectedStart(day);
      setSelectedEnd(day);
    }
  };

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Select Date</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Month Header */}
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: theme.text, fontSize: 20 }}>‹</Text>
          </TouchableOpacity>
          <Text style={[styles.monthText, { color: theme.text }]}>{currentMonth}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: theme.text, fontSize: 20 }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Week Days */}
        <View style={styles.weekDays}>
          {weekDays.map((day) => (
            <Text key={day} style={[styles.weekDay, { color: theme.textSecondary }]}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendar}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayCell,
                isInRange(day) && !isStart(day) && !isEnd(day) && {
                  backgroundColor: theme.primaryLight,
                },
                isStart(day) && {
                  backgroundColor: theme.primary,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                },
                isEnd(day) && {
                  backgroundColor: theme.primary,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                },
              ]}
              onPress={() => handleDayPress(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: isInRange(day) || isStart(day) || isEnd(day) ? theme.primary : theme.text },
                  (isStart(day) || isEnd(day)) && { color: "#FFF", fontWeight: "700" },
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Check In / Check Out Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
          <View style={styles.summaryItem}>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Check in</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>📅</Text>
              <Text style={[styles.summaryDate, { color: theme.text }]}>Dec {selectedStart}</Text>
            </View>
          </View>
          <View style={[styles.summaryArrow, { backgroundColor: theme.primaryLight }]}>
            <Text style={{ color: theme.primary, fontSize: 16 }}>→</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Check out</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>📅</Text>
              <Text style={[styles.summaryDate, { color: theme.text }]}>Dec {selectedEnd}</Text>
            </View>
          </View>
        </View>

        {/* Guest & Total */}
        <View style={[styles.guestCard, { backgroundColor: theme.card }]}>
          <View style={styles.guestRow}>
            <Text style={{ color: theme.textSecondary }}>Guest</Text>
            <View style={styles.guestCounter}>
              <TouchableOpacity
                style={[styles.guestBtn, { backgroundColor: theme.backgroundSecondary }]}
                onPress={() => setGuests(Math.max(1, guests - 1))}
              >
                <Text style={{ color: theme.text }}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.guestValue, { color: theme.text }]}>{guests}</Text>
              <TouchableOpacity
                style={[styles.guestBtn, { backgroundColor: theme.primary }]}
                onPress={() => setGuests(guests + 1)}
              >
                <Text style={{ color: "#FFF" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.totalRow}>
            <Text style={{ color: theme.text, fontWeight: "600", fontSize: 16 }}>Total</Text>
            <Text style={[styles.totalPrice, { color: theme.primary }]}>${total}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Continue Button */}
      <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("Payment", { hotel, nights, guests, total })}
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
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthText: { fontSize: 18, fontWeight: "600" },
  weekDays: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  dayText: { fontSize: 14 },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
  },
  summaryItem: { flex: 1 },
  summaryDate: { fontSize: 16, fontWeight: "600" },
  summaryArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  guestCard: { marginTop: 16, padding: 16, borderRadius: 16 },
  guestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  guestCounter: { flexDirection: "row", alignItems: "center" },
  guestBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  guestValue: { fontSize: 16, fontWeight: "600", marginHorizontal: 12 },
  divider: { height: 1, marginVertical: 12 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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