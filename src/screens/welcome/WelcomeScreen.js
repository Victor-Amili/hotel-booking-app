import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  StatusBar,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Destructure navigation from props
const WelcomeScreen = ({ navigation }) => {
  
  useEffect(() => {
    // Wait for 3 seconds, then seamlessly transition to WelcomeScreen1
    const timer = setTimeout(() => {
      navigation.replace('WelcomeScreen1');
    }, 3000); // 3000ms = 3 seconds (adjust as you see fit)

    // Clear the timer if the component unmounts prematurely
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" transparent backgroundColor="transparent" translucent />
      
      <ImageBackground 
        source={require('../../../assets/welcomebg.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Transparent overlay bottom container to hold the content */}
        <View style={styles.contentContainer}>
          
          {/* Main Headline */}
          <View style={styles.headlineContainer}>
            <Text style={styles.welcomeText}>
              Welcome to <Text style={styles.handEmoji}>👋</Text>
            </Text>
            <Text style={styles.brandText}>Hotel</Text>
          </View>

          {/* Subtitle / Description */}
          <Text style={styles.subtitleText}>
            The best hotel booking in this century{'\n'}to accompany your vacation
          </Text>
          
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: 'flex-end', 
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 60, 
    backgroundColor: 'rgba(0, 0, 0, 0.15)', 
    paddingTop: 40,
  },
  headlineContainer: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  handEmoji: {
    fontStyle: 'normal', 
  },
  brandText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#10B981', 
    fontStyle: 'italic',
    marginTop: -4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitleText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    fontWeight: '500',
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});

export default WelcomeScreen;