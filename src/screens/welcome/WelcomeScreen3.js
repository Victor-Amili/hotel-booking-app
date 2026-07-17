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

const WelcomeScreen3 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Image Section with unique curved mask */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/welcome3.png')} // Replace with your beach image path
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {/* Main Heading Text */}
        <Text style={styles.title}>
          Let’s{"\n"}have the{"\n"}best{"\n"}vacation{"\n"}with us
        </Text>

        {/* Subtitle / Description */}
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        {/* Pagination Dots (Third Dot Active) */}
        <View style={styles.paginationContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
      </View>

      {/* Bottom Button Row */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')} // Skip straight to Login
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => navigation.replace('Login')} // Use .replace so they can't back-track into onboarding
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
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
    lineHeight: 46,
    marginBottom: 20,
    fontFamily: 'System', 
  },
  subtitle: {
    fontSize: 14,
    color: '#7C7C7C',
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
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 28, // Wide pill active indicator
    backgroundColor: '#10B981', // App brand green
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#10B981', 
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen3;