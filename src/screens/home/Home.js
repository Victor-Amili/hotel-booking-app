import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
// Import Lucide icons
import { Bell, Bookmark, Search, SlidersHorizontal, MapPin, Star } from 'lucide-react-native';
import { useTheme } from "../../context/themecontext"; // Added theme context

const Home = ({navigation}) => {
  const { theme } = useTheme(); // Initialize theme
  const [activeCategory, setActiveCategory] = useState('Recommended');

  const categories = ['Recommended', 'Popular', 'Trending', 'Trendy'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Make StatusBar text light/dark based on the background color */}
      <StatusBar 
        barStyle={theme.background === '#FFFFFF' || theme.background === '#FFF' ? "dark-content" : "light-content"} 
        backgroundColor={theme.background} 
      />
      
      {/* 1. Header Section - Added explicit paddingTop for top spacing */}
      <View style={[styles.header, { paddingTop: 50 }]}>
        <View style={styles.userInfo}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.backgroundSecondary, borderColor: theme.primary }]}>
            <Text style={[styles.avatarText, { color: theme.primary }]}>H</Text>
          </View>
          <View style={styles.userTextContainer}>
            <Text style={[styles.brandTitle, { color: theme.text }]}>Hotel</Text>
            <Text style={[styles.userName, { color: theme.text }]}>Bessie Cooper 👋</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell color={theme.text} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}  onPress={() => navigation.navigate("Bookmarks")}>
            <Bookmark color={theme.text} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. Search Bar Section */}
        <View style={[styles.searchContainer, { backgroundColor: theme.backgroundSecondary }]}>
          <Search color={theme.textSecondary} size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={theme.textSecondary}
            style={[styles.searchInput, { color: theme.text }]}
          />
          <TouchableOpacity>
            <SlidersHorizontal color={theme.primary} size={18} />
          </TouchableOpacity>
        </View>

        {/* 3. Horizontal Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryBadge, 
                  { 
                    borderColor: theme.primary,
                    backgroundColor: isActive ? theme.primary : theme.background 
                  }
                ]}
              >
                <Text style={[
                  styles.categoryText, 
                  { color: isActive ? '#FFFFFF' : theme.primary }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 4. Large Cards Carousel (Horizontal) */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContent}
        >
          {/* Card 1 */}
          <ImageBackground
            source={require('../../../assets/room1.png')} // Replace with your image asset path
            style={styles.featuredCard}
            imageStyle={{ borderRadius: 24 }}
          >
            <View style={styles.cardOverlay}>
              <View>
                <Text style={styles.cardTitle}>Emeralda De Hotel</Text>
                <View style={styles.locationContainer}>
                  <MapPin color="#FFFFFF" size={12} style={{ marginRight: 4 }} />
                  <Text style={styles.cardLocation}>Paris, France</Text>
                </View>
                <Text style={styles.cardPrice}>$29 <Text style={styles.cardPriceLabel}>/ per night</Text></Text>
              </View>
              <TouchableOpacity style={styles.cardBookmark}>
                <Bookmark color="#FFFFFF" size={20} fill="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/* Card 2 (Partial view mimicking design) */}
          <ImageBackground
            source={require('../../../assets/room1.png')} // Replace with your image asset path
            style={styles.featuredCard}
            imageStyle={{ borderRadius: 24 }}
          >
            <View style={styles.cardOverlay}>
              <View>
                <Text style={styles.cardTitle}>Emeralda...</Text>
                <View style={styles.locationContainer}>
                  <MapPin color="#FFFFFF" size={12} style={{ marginRight: 4 }} />
                  <Text style={styles.cardLocation}>Paris, France</Text>
                </View>
                <Text style={styles.cardPrice}>$39 <Text style={styles.cardPriceLabel}>/ per night</Text></Text>
              </View>
              <TouchableOpacity style={styles.cardBookmark}>
                <Bookmark color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>

        {/* 5. Recently Booked Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recently Booked</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RecentlyBooked")}
          >
            <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* 6. List Item (Recently Booked) */}
        <View style={[styles.bookedItem, { backgroundColor: theme.card }]}>
          <Image 
            source={require('../../../assets/room1.png')} // Replace with your image asset path
            style={styles.bookedThumb}
          />
          <View style={styles.bookedDetails}>
            <Text style={[styles.bookedTitle, { color: theme.text }]}>President Hotel</Text>
            <Text style={[styles.bookedLocation, { color: theme.textSecondary }]}>Paris, France</Text>
            <View style={styles.ratingContainer}>
              <Star color={theme.star || "#FBBF24"} size={14} fill={theme.star || "#FBBF24"} />
              <Text style={[styles.ratingText, { color: theme.text }]}>
                4.8 <Text style={[styles.reviewText, { color: theme.textSecondary }]}>(6,283 reviews)</Text>
              </Text>
            </View>
          </View>
          <View style={styles.bookedAction}>
            <Text style={[styles.bookedPrice, { color: theme.primary }]}>$35</Text>
            <TouchableOpacity style={styles.listItemBookmark}>
              <Bookmark color={theme.primary} size={20} fill={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    // paddingTop is now handled inline dynamically to match the Booking Screen
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userTextContainer: {
    marginLeft: 12,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 52,
    marginTop: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesContainer: {
    marginTop: 16,
    maxHeight: 44,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
  },
  cardsContent: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 10,
  },
  featuredCard: {
    width: 260,
    height: 340,
    marginRight: 16,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: '40%',
  },
  cardTitle: {
    color: '#FFFFFF', // Kept white since it's an image overlay
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardLocation: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  cardPrice: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardPriceLabel: {
    fontSize: 12,
    fontWeight: 'normal',
    opacity: 0.8,
  },
  cardBookmark: {
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontWeight: '600',
    fontSize: 14,
  },
  bookedItem: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookedThumb: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  bookedDetails: {
    flex: 1,
    marginLeft: 14,
  },
  bookedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookedLocation: {
    fontSize: 13,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewText: {
    fontWeight: 'normal',
  },
  bookedAction: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
  },
  bookedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemBookmark: {
    marginTop: 8,
  }
});

export default Home;