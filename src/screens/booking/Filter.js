import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../context/themecontext";

export default function Filter({ navigation }) {
  const { theme } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [selectedSort, setSelectedSort] = useState("Highest Popularity");
  const [selectedStars, setSelectedStars] = useState([5, 4]);
  const [selectedFacilities, setSelectedFacilities] = useState(["WiFi", "Swimming Pool"]);
  const [selectedTypes, setSelectedTypes] = useState(["Hotels", "Resorts"]);

  const countries = ["France", "Italy", "Turkey", "Germany", "Spain"];
  const sortOptions = ["Highest Popularity", "Highest Price", "Highest Rating"];
  const stars = [5, 4, 3, 2, 1];
  const facilities = ["WiFi", "Swimming Pool", "Parking", "Restaurant"];
  const accommodationTypes = ["Hotels", "Resorts", "Villas", "Apartments"];

  const toggleArray = (arr, setArr, item) => {
    if (arr.includes(item)) {
      setArr(arr.filter((x) => x !== item));
    } else {
      setArr([...arr, item]);
    }
  };

  const Chip = ({ label, selected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.primary : theme.backgroundSecondary,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: selected ? "#FFF" : theme.text, fontSize: 13 }}>{label}</Text>
    </TouchableOpacity>
  );

  const CheckItem = ({ label, selected, onPress }) => (
    <TouchableOpacity style={styles.checkItem} onPress={onPress}>
      <View
        style={[
          styles.checkbox,
          { backgroundColor: selected ? theme.primary : theme.backgroundSecondary },
        ]}
      >
        {selected && <Text style={{ color: "#FFF", fontSize: 12 }}>✓</Text>}
      </View>
      <Text style={{ color: theme.text }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>Filter Hotel</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Country */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Country</Text>
        <View style={styles.chipRow}>
          {countries.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={selectedCountry === c}
              onPress={() => setSelectedCountry(c)}
            />
          ))}
        </View>

        {/* Sort Result */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Sort Result</Text>
        <View style={styles.chipRow}>
          {sortOptions.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={selectedSort === s}
              onPress={() => setSelectedSort(s)}
            />
          ))}
        </View>

        {/* Price Range */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Price Range per Night</Text>
          <Text style={{ color: theme.primary, fontWeight: "600" }}>$20 - $100</Text>
        </View>
        <View style={[styles.priceBar, { backgroundColor: theme.backgroundSecondary }]}>
          <View
            style={[
              styles.priceFill,
              { backgroundColor: theme.primary, left: "20%", right: "20%" },
            ]}
          />
        </View>

        {/* Star Rating */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Star Rating</Text>
        <View style={styles.chipRow}>
          {stars.map((s) => (
            <Chip
              key={s}
              label={`${s}★`}
              selected={selectedStars.includes(s)}
              onPress={() => toggleArray(selectedStars, setSelectedStars, s)}
            />
          ))}
        </View>

        {/* Facilities */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Facilities</Text>
          <TouchableOpacity>
            <Text style={{ color: theme.primary }}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkList}>
          {facilities.map((f) => (
            <CheckItem
              key={f}
              label={f}
              selected={selectedFacilities.includes(f)}
              onPress={() => toggleArray(selectedFacilities, setSelectedFacilities, f)}
            />
          ))}
        </View>

        {/* Accommodation Type */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Accommodation Type</Text>
          <TouchableOpacity>
            <Text style={{ color: theme.primary }}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkList}>
          {accommodationTypes.map((t) => (
            <CheckItem
              key={t}
              label={t}
              selected={selectedTypes.includes(t)}
              onPress={() => toggleArray(selectedTypes, setSelectedTypes, t)}
            />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.resetBtn, { borderColor: theme.border }]}
          onPress={() => {
            setSelectedCountry("France");
            setSelectedSort("Highest Popularity");
            setSelectedStars([5, 4]);
            setSelectedFacilities([]);
            setSelectedTypes([]);
          }}
        >
          <Text style={{ color: theme.textSecondary }}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.applyBtn, { backgroundColor: theme.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#FFF", fontWeight: "600" }}>Apply Filter</Text>
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
  headerTitle: { fontSize: 18, fontWeight: "600" },
  content: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 20, marginBottom: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
  },
  priceBar: {
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    position: "relative",
  },
  priceFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 3,
  },
  checkList: { gap: 12 },
  checkItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 0.5,
    gap: 12,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  applyBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
});