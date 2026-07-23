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

const WelcomeScreen1 = ({navigation}) => {
  const { theme } = useTheme();
  
  // Optional: Determine if it's dark mode to toggle the StatusBar text color. 
  // If your theme object has an 'isDark' or 'type' property, use that. 
  // Here is a safe fallback assuming dark backgrounds are usually dark hex/rgb colors.
  const isDarkMode = theme.background === '#000000' || theme.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* Top Image Section with unique curved mask */}
      <View style={styles.imageContainer}>
        <Image 
           source={require('../../../assets/welcome1.png')} // Replace with your image path
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {/* Main Heading Text */}
        <Text style={[styles.title, { color: theme.text }]}>
          Let’s{"\n"}have the{"\n"}best{"\n"}vacation{"\n"}with us
        </Text>

        {/* Subtitle / Description */}
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot, { backgroundColor: theme.primary }]} />
          <View style={[styles.dot, { backgroundColor: theme.border || '#E0E0E0' }]} />
          <View style={[styles.dot, { backgroundColor: theme.border || '#E0E0E0' }]} />
        </View>
      </View>

      {/* Bottom Button Row */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          activeOpacity={0.8} 
          onPress={() => navigation.navigate('Login')}
        >
          {/* Usually button text stays white on a primary colored button, even in dark mode */}
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={() => navigation.navigate('WelcomeScreen2')} // 👈 This triggers the transition
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
    // Creates the distinct sweeping organic cutout style at the bottom left
    borderBottomLeftRadius: 180,
    transform: [{ scaleX: 1.1 }], 
  },
  image: {
    width: '100%',
    height: '100%',
    // Reverses the scaleX tweak so the actual image doesn't look stretched
    transform: [{ scaleX: 0.91 }], 
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
    width: 28, // Distinct wide pill active dot
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
    color: '#FFFFFF', // Keeping white since the button background takes the primary color
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen1;