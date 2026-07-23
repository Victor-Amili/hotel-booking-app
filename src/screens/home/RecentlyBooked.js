import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { ArrowLeft, Bookmark, Star, SquareCheck, Layers } from 'lucide-react-native';
// Import Theme Context
import { useTheme } from "../../context/themecontext";

const RecentlyBooked = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  // Mock data matching the specific entries in your image layout
  const bookedData = [
    { id: 1, name: 'President Hotel', location: 'paris,France', rating: 4.8, reviews: '6,283', price: 35, status: 'checked', image: require('../../../assets/room1.png') },
    { id: 2, name: 'Palazzo Versace', location: 'Rome,Italia', rating: 4.8, reviews: '6,283', price: 40, status: 'checked', image: require('../../../assets/room1.png') },
    { id: 3, name: 'Palazzo Versace', location: 'Rome,Italia', rating: 4.8, reviews: '6,283', price: 40, status: 'bookmark', image: require('../../../assets/room1.png') },
    { id: 4, name: 'Martinez Cannes', location: 'Rome,Italia', rating: 4.8, reviews: '6,283', price: 50, status: 'bookmark', image: require('../../../assets/room1.png') },
    { id: 5, name: 'Palazzo Versace', location: 'Rome,Italia', rating: 4.8, reviews: '6,283', price: 40, status: 'bookmark', image: require('../../../assets/room1.png') },
    { id: 6, name: 'Palazzo Versace', location: 'Rome,Italia', rating: 4.8, reviews: '6,283', price: 40, status: 'bookmark', image: require('../../../assets/room1.png') },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
            <ArrowLeft color={theme.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Recently Booked</Text>
        </View>

        <TouchableOpacity style={styles.layoutToggle}>
          <Layers color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      {/* Vertical Scroll List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {bookedData.map((item) => (
          <View key={item.id} style={[styles.bookedCard, { backgroundColor: theme.card || theme.backgroundSecondary }]}>
            {/* Thumbnail Image */}
            <Image source={item.image} style={[styles.cardThumb, { backgroundColor: theme.backgroundSecondary }]} />

            {/* Middle Details Container */}
            <View style={styles.cardDetails}>
              <Text style={[styles.hotelName, { color: theme.text }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.hotelLocation, { color: theme.textSecondary }]}>{item.location}</Text>
              
              <View style={styles.ratingContainer}>
                <Star color="#FBBF24" fill="#FBBF24" size={14} />
                <Text style={[styles.ratingText, { color: theme.primary }]}>
                  {item.rating}
                  <Text style={[styles.reviewsText, { color: theme.textSecondary }]}> ({item.reviews} reviews)</Text>
                </Text>
              </View>
            </View>

            {/* Right Interactive Sidebar Stack */}
            <View style={styles.actionColumn}>
              <Text style={[styles.priceText, { color: theme.primary }]}>${item.price}</Text>
              
              <TouchableOpacity activeOpacity={0.7}>
                {item.status === 'checked' ? (
                  <SquareCheck color={theme.primary} size={22} fill={isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.05)"} />
                ) : (
                  <Bookmark color={theme.primary} size={22} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 10, // Safe top inset padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  layoutToggle: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  bookedCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    // Native shadow treatment to replicate the soft cards layout
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardThumb: {
    width: 76,
    height: 76,
    borderRadius: 16,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  hotelLocation: {
    fontSize: 13,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  reviewsText: {
    fontWeight: '400',
  },
  actionColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 68,
    paddingVertical: 2,
    paddingLeft: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
  },
});

export default RecentlyBooked;