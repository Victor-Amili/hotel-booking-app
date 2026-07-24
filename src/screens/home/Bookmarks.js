import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
// Added LayoutGrid/Layers for the header layout toggle if needed
import { ArrowLeft, Bookmark, Star, SquareCheck, Layers } from 'lucide-react-native';
import { useTheme } from "../../context/themecontext"; // Added theme context

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const Bookmarks = ({ navigation }) => {
  const { theme } = useTheme(); // Initialize theme

  // 1. Turned data into a state array so removing items actually updates the UI
  const [bookmarkData, setBookmarkData] = useState([
    { id: 1, name: 'President Mila De Hotel', rating: 4.8, price: 35, type: 'bookmark', image: require('../../../assets/room1.png') },
    { id: 2, name: 'Martinez Cannes', rating: 4.8, price: 25, type: 'bookmark', image: require('../../../assets/room1.png') },
    { id: 3, name: 'President Mila De Hotel', rating: 4.8, price: 35, type: 'checked', image: require('../../../assets/room1.png') },
    { id: 4, name: 'President Mila De Hotel', rating: 4.8, price: 35, type: 'checked', image: require('../../../assets/room1.png') },
    { id: 5, name: 'President Mila De Hotel', rating: 4.8, price: 35, type: 'bookmark', image: require('../../../assets/room1.png') },
    { id: 6, name: 'President Mila De Hotel', rating: 4.8, price: 35, type: 'bookmark', image: require('../../../assets/room1.png') },
  ]);

  // 2. States to handle UI Modal management
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Triggered when clicking a bookmark icon to prompt removal
  const handleOpenRemoveModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Triggered on "Yes, Remove"
  const handleConfirmRemove = () => {
    if (selectedItem) {
      setBookmarkData(prevData => prevData.filter(item => item.id !== selectedItem.id));
    }
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Make StatusBar text light/dark based on the background color */}
      <StatusBar 
        barStyle={theme.background === '#FFFFFF' || theme.background === '#FFF' ? "dark-content" : "light-content"} 
        backgroundColor={theme.background} 
      />

      {/* Header Section - Added explicit paddingTop for top spacing */}
      <View style={[styles.header, { borderBottomColor: theme.backgroundSecondary, paddingTop: 50 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
            <ArrowLeft color={theme.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>My Bookmark</Text>
        </View>
        
        {/* Added Layout toggle icon shown in top right of new design */}
        <TouchableOpacity style={styles.layoutToggle}>
          <Layers color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      {/* Grid Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {bookmarkData.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: theme.card || theme.backgroundSecondary }]}>
              <Image source={item.image} style={styles.cardImage} />
              
              <View style={styles.cardDetails}>
                <Text style={[styles.cardName, { color: theme.text }]} numberOfLines={2}>
                  {item.name}
                </Text>
                
                <View style={styles.ratingContainer}>
                  <Star color={theme.star || "#FBBF24"} fill={theme.star || "#FBBF24"} size={14} />
                  <Text style={[styles.ratingText, { color: theme.primary }]}>{item.rating}</Text>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={[styles.priceText, { color: theme.primary }]}>
                    ${item.price}<Text style={[styles.priceUnit, { color: theme.textSecondary }]}>/night</Text>
                  </Text>
                  
                  {/* Clicking this now triggers the bottom sheet confirmation */}
                  <TouchableOpacity onPress={() => handleOpenRemoveModal(item)}>
                    {item.type === 'checked' ? (
                      <SquareCheck color={theme.primary} size={20} fill="rgba(16, 185, 129, 0.1)" />
                    ) : (
                      <Bookmark color={theme.primary} fill={theme.primary} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 3. Bottom Sheet Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
                
                {/* Visual Accent Drag Indicator Bar */}
                <View style={[styles.dragIndicator, { backgroundColor: theme.primary }]} />

                <Text style={[styles.modalTitle, { color: theme.text }]}>Remove from Bookmark ?</Text>
                
                <View style={[styles.divider, { backgroundColor: theme.backgroundSecondary }]} />

                {/* Selected Item Preview Box */}
                {selectedItem && (
                  <View style={[styles.previewCard, { backgroundColor: theme.card, borderColor: theme.backgroundSecondary }]}>
                    <Image source={selectedItem.image} style={styles.previewImage} />
                    <View style={styles.previewDetails}>
                      <Text style={[styles.previewName, { color: theme.text }]}>{selectedItem.name}</Text>
                      <Text style={[styles.previewLocation, { color: theme.textSecondary }]}>Rome, Italia</Text>
                      <View style={styles.previewRating}>
                        <Star color={theme.star || "#FBBF24"} fill={theme.star || "#FBBF24"} size={14} />
                        <Text style={[styles.previewRatingText, { color: theme.primary }]}>
                          4.8 <Text style={[styles.reviewCount, { color: theme.textSecondary }]}>(6,283 reviews)</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.previewRight}>
                      <Text style={[styles.previewPrice, { color: theme.primary }]}>${selectedItem.price}</Text>
                      <Bookmark color={theme.primary} fill={theme.primary} size={20} />
                    </View>
                  </View>
                )}

                {/* Modal Actions Footer Buttons */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, { backgroundColor: theme.backgroundSecondary }]} 
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.buttonText, { color: theme.primary }]}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.modalButton, { backgroundColor: theme.primary }]} 
                    onPress={handleConfirmRemove}
                  >
                    <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Yes, Remove</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
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
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardDetails: {
    padding: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    minHeight: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
  },
  priceUnit: {
    fontSize: 11,
    fontWeight: 'normal',
  },
  
  /* --- Bottom Sheet Modal Styles --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Blurs/dims the background items
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'center',
  },
  dragIndicator: {
    width: 44,
    height: 4,
    borderRadius: 2,
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 20,
  },
  previewCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 24,
  },
  previewImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  previewDetails: {
    flex: 1,
    marginLeft: 14,
  },
  previewName: {
    fontSize: 15,
    fontWeight: '700',
  },
  previewLocation: {
    fontSize: 13,
    marginTop: 2,
  },
  previewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  previewRatingText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  reviewCount: {
    fontWeight: 'normal',
  },
  previewRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
  },
  previewPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  }
});

export default Bookmarks;