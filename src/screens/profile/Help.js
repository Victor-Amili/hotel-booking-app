import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Headphones, 
  MessageSquare, 
  Mail,
  HelpCircle
} from 'lucide-react-native';

// Enable layout animations on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Help = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('General');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = ['General', 'Account', 'Booking', 'Payment'];

  const faqs = [
    {
      id: '1',
      category: 'General',
      question: 'What is this app used for?',
      answer: 'Our app allows you to explore, plan, and book the best travel experiences and vacations seamlessly with just a few taps.'
    },
    {
      id: '2',
      category: 'General',
      question: 'How do I change my account details?',
      answer: 'Go to Profile > Edit Profile to update your name, phone number, country, and other personal information.'
    },
    {
      id: '3',
      category: 'Booking',
      question: 'How can I cancel or reschedule a booking?',
      answer: 'You can manage your bookings directly under the My Bookings tab. Select the trip you wish to modify and choose Cancel or Reschedule.'
    },
    {
      id: '4',
      category: 'Payment',
      question: 'What payment methods are supported?',
      answer: 'We support all major Credit/Debit cards, PayPal, Apple Pay, and Google Pay for fast and secure transactions.'
    },
    {
      id: '5',
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'You can reset your password by going to Profile > Security > Change Password, or by tapping "Forgot Password" on the Login screen.'
    }
  ];

  const toggleFaq = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'General' ? true : faq.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <ArrowLeft color="#000000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#A1A1AA" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search questions or topics..."
            placeholderTextColor="#A1A1AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                activeTab === cat && styles.activeCategoryChip
              ]}
              onPress={() => setActiveTab(cat)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.categoryText,
                activeTab === cat && styles.activeCategoryText
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FAQ Section Title */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {/* FAQ Accordions */}
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <View key={faq.id} style={styles.faqCard}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleFaq(faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  {isExpanded ? (
                    <ChevronUp color="#10B981" size={20} />
                  ) : (
                    <ChevronDown color="#71717A" size={20} />
                  )}
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <HelpCircle color="#D1D5DB" size={48} />
            <Text style={styles.emptyStateText}>No questions found matching your search.</Text>
          </View>
        )}

        {/* Contact Support Section */}
        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Contact Support</Text>

        <View style={styles.supportRow}>
          {/* Call Support */}
          <TouchableOpacity style={styles.supportCard} activeOpacity={0.8}>
            <View style={styles.supportIconBg}>
              <Headphones color="#10B981" size={22} />
            </View>
            <Text style={styles.supportTitle}>Call Us</Text>
            <Text style={styles.supportSubtitle}>24/7 Hotline</Text>
          </TouchableOpacity>

          {/* WhatsApp Support */}
          <TouchableOpacity style={styles.supportCard} activeOpacity={0.8}>
            <View style={styles.supportIconBg}>
              <MessageSquare color="#10B981" size={22} />
            </View>
            <Text style={styles.supportTitle}>Live Chat</Text>
            <Text style={styles.supportSubtitle}>Instant assistance</Text>
          </TouchableOpacity>

          {/* Email Support */}
          <TouchableOpacity style={styles.supportCard} activeOpacity={0.8}>
            <View style={styles.supportIconBg}>
              <Mail color="#10B981" size={22} />
            </View>
            <Text style={styles.supportTitle}>Email</Text>
            <Text style={styles.supportSubtitle}>Get in touch</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#18181B',
  },
  categoryContainer: {
    paddingBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F4F4F5',
    marginRight: 10,
  },
  activeCategoryChip: {
    backgroundColor: '#10B981',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginVertical: 16,
  },
  faqCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#18181B',
    paddingRight: 10,
  },
  faqAnswerContainer: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 10,
  },
  supportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  supportIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#18181B',
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 11,
    color: '#6B7280',
  },
});

export default Help;