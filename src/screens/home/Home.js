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

const Home = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState('Recommended');

  const categories = ['Recommended', 'Popular', 'Trending', 'Trendy'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* 1. Header Section */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>H</Text>
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.brandTitle}>Hotel</Text>
            <Text style={styles.userName}>Bessie Cooper 👋</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell color="#000000" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}  onPress={() => navigation.navigate("Bookmarks")}>
            <Bookmark color="#000000" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. Search Bar Section */}
        <View style={styles.searchContainer}>
          <Search color="#B0B0B0" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#B0B0B0"
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <SlidersHorizontal color="#10B981" size={18} />
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
                style={[styles.categoryBadge, isActive && styles.activeCategoryBadge]}
              >
                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
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
          <Text style={styles.sectionTitle}>Recently Booked</Text>
         <TouchableOpacity
  onPress={() => navigation.navigate("RecentlyBooked")}
>
  <Text style={styles.seeAllText}>See All</Text>
</TouchableOpacity>
        </View>

        {/* 6. List Item (Recently Booked) */}
        <View style={styles.bookedItem}>
          <Image 
            source={require('../../../assets/room1.png')} // Replace with your image asset path
            style={styles.bookedThumb}
          />
          <View style={styles.bookedDetails}>
            <Text style={styles.bookedTitle}>President Hotel</Text>
            <Text style={styles.bookedLocation}>paris, France</Text>
            <View style={styles.ratingContainer}>
              <Star color="#FBBF24" size={14} fill="#FBBF24" />
              <Text style={styles.ratingText}>4.8 <Text style={styles.reviewText}>(6,283 reviews)</Text></Text>
            </View>
          </View>
          <View style={styles.bookedAction}>
            <Text style={styles.bookedPrice}>$35</Text>
            <TouchableOpacity style={styles.listItemBookmark}>
              <Bookmark color="#10B981" size={20} fill="#10B981" />
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
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  avatarText: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userTextContainer: {
    marginLeft: 12,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
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
    backgroundColor: '#F9FAFB',
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
    color: '#000000',
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
    borderColor: '#10B981',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  activeCategoryBadge: {
    backgroundColor: '#10B981',
  },
  categoryText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  activeCategoryText: {
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    color: '#000000',
  },
  seeAllText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  bookedItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
  },
  bookedLocation: {
    fontSize: 13,
    color: '#6B7280',
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
    color: '#111827',
    marginLeft: 4,
  },
  reviewText: {
    fontWeight: 'normal',
    color: '#6B7280',
  },
  bookedAction: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
  },
  bookedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  listItemBookmark: {
    marginTop: 8,
  }
});

export default Home;