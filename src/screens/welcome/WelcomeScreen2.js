import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';

// Import your theme context
import { useTheme } from "../../context/themecontext";

const WelcomeScreen2 = ({ navigation }) => {
  const { theme } = useTheme();
  
  // Determine if it's dark mode to toggle the StatusBar text color
  const isDarkMode = theme.background === '#000000' || theme.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* Top Image Section with unique curved mask and blue accent border */}
      <View style={styles.imageContainer}>
        <Image 
           source={require('../../../assets/welcome2.png')} // Replace with your image path
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {/* Main Heading Text */}
        <Text style={[styles.title, { color: theme.text }]}>
          Travel{"\n"}made easy{"\n"}in your{"\n"}hands
        </Text>

        {/* Subtitle / Description */}
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        {/* Pagination Dots (Middle Dot Active) */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, { backgroundColor: theme.border || '#E0E0E0' }]} />
          <View style={[styles.dot, styles.activeDot, { backgroundColor: theme.primary }]} />
          <View style={[styles.dot, { backgroundColor: theme.border || '#E0E0E0' }]} />
        </View>
      </View>

      {/* Bottom Button Row */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')} // Go back or skip
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={() => navigation.navigate('WelcomeScreen3')} // 👈 This triggers the transition
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Removed static background color to rely on theme
  },
  imageContainer: {
    width: '100%',
    height: '45%',
    overflow: 'hidden',
    borderBottomLeftRadius: 180,
    transform: [{ scaleX: 1.1 }],
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [{ scaleX: 0.91 }], // Counter-balance the parent scale
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 46,
    marginBottom: 20,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
    marginBottom: 35,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Kept white to contrast with primary button background
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen2;