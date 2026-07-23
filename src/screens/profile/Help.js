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
// Import Theme Context
import { useTheme } from "../../context/themecontext";

// Enable layout animations on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Help = ({ navigation }) => {
  const { theme, isDark } = useTheme();

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Help & Support</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.card || theme.backgroundSecondary }]}>
          <Search color={theme.textSecondary || "#A1A1AA"} size={20} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search questions or topics..."
            placeholderTextColor={theme.textSecondary || "#A1A1AA"}
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
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  { backgroundColor: isActive ? theme.primary : (theme.card || theme.backgroundSecondary) }
                ]}
                onPress={() => setActiveTab(cat)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.categoryText,
                  { color: isActive ? "#FFFFFF" : (theme.textSecondary || "#71717A") }
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* FAQ Section Title */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Frequently Asked Questions</Text>

        {/* FAQ Accordions */}
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <View key={faq.id} style={[styles.faqCard, { backgroundColor: theme.card || theme.backgroundSecondary }]}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleFaq(faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.faqQuestion, { color: theme.text }]}>{faq.question}</Text>
                  {isExpanded ? (
                    <ChevronUp color={theme.primary} size={20} />
                  ) : (
                    <ChevronDown color={theme.textSecondary || "#71717A"} size={20} />
                  )}
                </TouchableOpacity>
                {isExpanded && (
                  <View style={[styles.faqAnswerContainer, { borderColor: isDark ? '#27272A' : '#E5E7EB' }]}>
                    <Text style={[styles.faqAnswer, { color: theme.textSecondary }]}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <HelpCircle color={theme.textSecondary || "#D1D5DB"} size={48} />
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>No questions found matching your search.</Text>
          </View>
        )}

        {/* Contact Support Section */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 28 }]}>Contact Support</Text>

        <View style={styles.supportRow}>
          {/* Call Support */}
          <TouchableOpacity style={[styles.supportCard, { backgroundColor: theme.card || theme.backgroundSecondary }]} activeOpacity={0.8}>
            <View style={[styles.supportIconBg, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#E6F4EA' }]}>
              <Headphones color={theme.primary} size={22} />
            </View>
            <Text style={[styles.supportTitle, { color: theme.text }]}>Call Us</Text>
            <Text style={[styles.supportSubtitle, { color: theme.textSecondary }]}>24/7 Hotline</Text>
          </TouchableOpacity>

          {/* WhatsApp Support */}
          <TouchableOpacity style={[styles.supportCard, { backgroundColor: theme.card || theme.backgroundSecondary }]} activeOpacity={0.8}>
            <View style={[styles.supportIconBg, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#E6F4EA' }]}>
              <MessageSquare color={theme.primary} size={22} />
            </View>
            <Text style={[styles.supportTitle, { color: theme.text }]}>Live Chat</Text>
            <Text style={[styles.supportSubtitle, { color: theme.textSecondary }]}>Instant assistance</Text>
          </TouchableOpacity>

          {/* Email Support */}
          <TouchableOpacity style={[styles.supportCard, { backgroundColor: theme.card || theme.backgroundSecondary }]} activeOpacity={0.8}>
            <View style={[styles.supportIconBg, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#E6F4EA' }]}>
              <Mail color={theme.primary} size={22} />
            </View>
            <Text style={[styles.supportTitle, { color: theme.text }]}>Email</Text>
            <Text style={[styles.supportSubtitle, { color: theme.textSecondary }]}>Get in touch</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 10,
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  categoryContainer: {
    paddingBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 16,
  },
  faqCard: {
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
    paddingRight: 10,
  },
  faqAnswerContainer: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 14,
    marginTop: 10,
  },
  supportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportCard: {
    flex: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 11,
  },
});

export default Help;