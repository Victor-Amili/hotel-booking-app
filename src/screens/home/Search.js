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
  StatusBar
} from 'react-native';
import { Search as SearchIcon, SlidersHorizontal, Star, Bookmark } from 'lucide-react-native';

const SearchScreen = () => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Functional Search Input Section */}
      <View style={styles.searchContainer}>
        <SearchIcon color="#B0B0B0" size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B0B0B0"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal color="#10B981" size={18} />
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
                style={[styles.categoryBadge, isActive && styles.activeCategoryBadge]}
              >
                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 3. Dynamic Section Counter */}
      <View style={styles.metaContainer}>
        <Text style={styles.sectionTitle}>
          {activeCategory} ({filteredHotels.length})
        </Text>
      </View>

      {/* 4. Filtered Result List Container */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredHotels.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hotels found matching "{searchQuery}"</Text>
          </View>
        ) : (
          filteredHotels.map((item) => (
            <View key={item.id} style={styles.hotelCard}>
              <Image source={item.image} style={styles.cardThumb} />

              <View style={styles.cardDetails}>
                <Text style={styles.hotelName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.hotelLocation}>{item.location}</Text>
                
                <View style={styles.ratingContainer}>
                  <Star color="#FBBF24" fill="#FBBF24" size={14} />
                  <Text style={styles.ratingText}>
                    {item.rating}
                    <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.actionColumn}>
                <Text style={styles.priceText}>${item.price}</Text>
                <TouchableOpacity>
                  <Bookmark color="#10B981" size={22} />
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
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
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
    color: '#000000',
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
    fontSize: 13,
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  metaContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 24,
  },
  hotelCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F3F4F6',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  hotelLocation: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
    marginLeft: 4,
  },
  reviewsText: {
    color: '#9CA3AF',
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
    color: '#10B981',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default SearchScreen;