import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useTheme } from "../../context/themecontext";

const { width } = Dimensions.get("window");

export default function HotelDetails({ navigation, route }) {
  const { theme } = useTheme();
  const [activeImage, setActiveImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const hotel = route.params?.hotel || {
    name: "President Mila De Hotel",
    location: "79 place de la Madeleine, Paris",
    price: 35,
    rating: 4.8,
    reviews: 483,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
  ];

  const facilities = [
    { icon: "🏨", label: "Hotel" },
    { icon: "🛏️", label: "4 Bedroom" },
    { icon: "🛁", label: "2 Bathroom" },
    { icon: "📐", label: "4000sqft" },
  ];

  const amenities = [
    { icon: "🏊", label: "Swimming Pool" },
    { icon: "📶", label: "WiFi" },
    { icon: "🍽️", label: "Restaurant" },
    { icon: "🅿️", label: "Parking" },
    { icon: "🛗", label: "Elevator" },
    { icon: "🏋️", label: "Fitness Center" },
    { icon: "🧺", label: "Laundry" },
    { icon: "🐕", label: "Pet Friendly" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          style={[
            styles.iconBtn,
            { backgroundColor: theme.backgroundSecondary },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 18, color: theme.text }}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Hotel Details
        </Text>
        <TouchableOpacity
          style={[
            styles.iconBtn,
            { backgroundColor: theme.backgroundSecondary },
          ]}
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <Text style={{ fontSize: 18 }}>{isBookmarked ? "🔖" : "📑"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: galleryImages[activeImage] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.dotsContainer}>
            {galleryImages.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveImage(index)}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        index === activeImage
                          ? theme.primary
                          : "rgba(255,255,255,0.5)",
                      width: index === activeImage ? 24 : 8,
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title Row */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.hotelName, { color: theme.text }]}>
                {hotel.name}
              </Text>
              <View style={styles.locationRow}>
                <Text style={{ fontSize: 14, color: theme.primary }}>📍</Text>
                <Text style={[styles.location, { color: theme.textSecondary }]}>
                  {hotel.location}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.ratingBadge,
                { backgroundColor: theme.primaryLight },
              ]}
            >
              <Text style={{ color: theme.primary, fontWeight: "700" }}>
                ⭐ {hotel.rating}
              </Text>
            </View>
          </View>

          {/* Facilities */}
          <View style={styles.facilitiesRow}>
            {facilities.map((item, index) => (
              <View key={index} style={styles.facilityItem}>
                <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                <Text
                  style={[styles.facilityLabel, { color: theme.textSecondary }]}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Gallery Photos */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Gallery photos
            </Text>
            <TouchableOpacity>
              <Text style={{ color: theme.primary, fontWeight: "600" }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {galleryImages.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveImage(index)}
              >
                <Image source={{ uri: img }} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Description */}
          <Text
            style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}
          >
            Description
          </Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {showFullDesc
              ? hotel.description || ""
              : (hotel.description || "").slice(0, 120) + "..."}
            <Text
              style={{ color: theme.primary, fontWeight: "600" }}
              onPress={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? " Show less" : " Read more"}
            </Text>
          </Text>

          {/* Amenities */}
          <Text
            style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}
          >
            Facilities
          </Text>
          <View style={styles.amenitiesGrid}>
            {amenities.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.amenityItem,
                  { backgroundColor: theme.backgroundSecondary },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                <Text
                  style={[styles.amenityLabel, { color: theme.textSecondary }]}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Review */}
          <View style={styles.reviewRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Review
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={{ color: theme.star, fontWeight: "600" }}>
                ⭐ {hotel.rating}
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                ({hotel.reviews} reviews)
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={{ color: theme.primary, fontWeight: "600" }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom Price Bar */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: theme.card, borderTopColor: theme.border },
        ]}
      >
        <View>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Price per night
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={[styles.price, { color: theme.primary }]}>
              ${hotel.price}
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 14 }}>
              /night
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("Booking", { hotel })}
        >
          <Text style={styles.bookButtonText}>Book Now !</Text>
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
  imageContainer: { position: "relative", marginHorizontal: 20 },
  mainImage: { width: width - 40, height: 280, borderRadius: 20 },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  dot: { height: 8, borderRadius: 4, marginHorizontal: 4 },
  content: { padding: 20 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  hotelName: { fontSize: 22, fontWeight: "700", marginBottom: 4, flex: 1 },
  locationRow: { flexDirection: "row", alignItems: "center" },
  location: { fontSize: 13, marginLeft: 4 },
  ratingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  facilitiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  facilityItem: { alignItems: "center", flex: 1 },
  facilityLabel: { fontSize: 11, marginTop: 4, textAlign: "center" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  description: { fontSize: 14, lineHeight: 22 },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  amenityItem: {
    width: "23%",
    aspectRatio: 1,
    margin: "1%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  amenityLabel: { fontSize: 10, marginTop: 4, textAlign: "center" },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 0.5,
  },
  price: { fontSize: 24, fontWeight: "700" },
  bookButton: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
  },
  bookButtonText: { color: "#FFF", fontWeight: "600", fontSize: 16 },
});
