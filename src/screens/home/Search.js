import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { Search as SearchIcon, SlidersHorizontal, Star, Bookmark } from 'lucide-react-native';
// Import Theme Context
import { useTheme } from "../../context/themecontext";

const SearchScreen = () => {
  const { theme, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Hotel');

  const categories = ['All Hotel', 'Recommended', 'Trending', 'Trendy'];

  // Master mock data matching your hotel list items
  const hotelData = [
    { id: 1, name: 'President Hotel', location: 'paris,France', rating: 4.8, reviews: '6,283', price: 35, category: 'Recommended', image: require('../../../assets/room1.png') },
    { id: 2, name: 'Luxury President Hotel', location: 'paris,France', rating: 4.8, reviews: '6,283', price: 45, category: 'Trending', image: require('../../../assets/room1.png') },
    { id: 3, name: 'Standard President Hotel', location: 'paris,France', rating: 4.8, reviews: '6,283', price: 25, category: 'Trendy', image: require('../../../assets/room1.png') },
    { id: 4, name: 'Palazzo De Hotel', location: 'Rome,Italia', rating: 4.9, reviews: '3,120', price: 65, category: 'Recommended', image: require('../../../assets/room1.png') },
  ];

  // Live filtering engine based on search input and active category pill
  const filteredHotels = useMemo(() => {
    return hotelData.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'All Hotel' || hotel.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* 1. Functional Search Input Section */}
      <View style={[styles.searchContainer, { backgroundColor: theme.card || theme.backgroundSecondary }]}>
        <SearchIcon color={theme.textSecondary || "#B0B0B0"} size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.textSecondary || "#B0B0B0"}
          style={[styles.searchInput, { color: theme.text }]}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal color={theme.primary} size={18} />
        </TouchableOpacity>
      </View>

      {/* 2. Horizontal Category Pills */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
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
                  { borderColor: theme.primary },
                  isActive ? { backgroundColor: theme.primary } : { backgroundColor: theme.background }
                ]}
              >
                <Text style={[
                  styles.categoryText, 
                  { color: isActive ? "#FFFFFF" : theme.primary }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 3. Dynamic Section Counter */}
      <View style={styles.metaContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {activeCategory} ({filteredHotels.length})
        </Text>
      </View>

      {/* 4. Filtered Result List Container */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredHotels.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No hotels found matching "{searchQuery}"
            </Text>
          </View>
        ) : (
          filteredHotels.map((item) => (
            <View key={item.id} style={[styles.hotelCard, { backgroundColor: theme.card || theme.backgroundSecondary }]}>
              <Image source={item.image} style={[styles.cardThumb, { backgroundColor: theme.backgroundSecondary }]} />

              <View style={styles.cardDetails}>
                <Text style={[styles.hotelName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.hotelLocation, { color: theme.textSecondary }]}>{item.location}</Text>
                
                <View style={styles.ratingContainer}>
                  <Star color="#FBBF24" fill="#FBBF24" size={14} />
                  <Text style={[styles.ratingText, { color: theme.primary }]}>
                    {item.rating}
                    <Text style={[styles.reviewsText, { color: theme.textSecondary }]}> ({item.reviews} reviews)</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.actionColumn}>
                <Text style={[styles.priceText, { color: theme.primary }]}>${item.price}</Text>
                <TouchableOpacity>
                  <Bookmark color={theme.primary} size={22} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 10, // Safe top inset padding
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 52,
    marginTop: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  filterButton: {
    padding: 4,
  },
  categoriesWrapper: {
    marginTop: 16,
    height: 38,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 13,
  },
  metaContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 24,
  },
  hotelCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
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
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 14,
  },
});

export default SearchScreen;