import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { ArrowLeft, Bookmark, Star, SquareCheck, Layers } from 'lucide-react-native';

const RecentlyBooked = ({ navigation }) => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
            <ArrowLeft color="#000000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recently Booked</Text>
        </View>

        <TouchableOpacity style={styles.layoutToggle}>
          <Layers color="#10B981" size={24} />
        </TouchableOpacity>
      </View>

      {/* Vertical Scroll List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {bookedData.map((item) => (
          <View key={item.id} style={styles.bookedCard}>
            {/* Thumbnail Image */}
            <Image source={item.image} style={styles.cardThumb} />

            {/* Middle Details Container */}
            <View style={styles.cardDetails}>
              <Text style={styles.hotelName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.hotelLocation}>{item.location}</Text>
              
              <View style={styles.ratingContainer}>
                <Star color="#FBBF24" fill="#FBBF24" size={14} />
                <Text style={styles.ratingText}>
                  {item.rating}
                  <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
                </Text>
              </View>
            </View>

            {/* Right Interactive Sidebar Stack */}
            <View style={styles.actionColumn}>
              <Text style={styles.priceText}>${item.price}</Text>
              
              <TouchableOpacity activeOpacity={0.7}>
                {item.status === 'checked' ? (
                  <SquareCheck color="#10B981" size={22} fill="rgba(16, 185, 129, 0.05)" />
                ) : (
                  <Bookmark color="#10B981" size={22} />
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
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
    backgroundColor: '#FFFFFF',
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
});

export default RecentlyBooked;