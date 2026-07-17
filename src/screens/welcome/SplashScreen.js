import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  ActivityIndicator, 
  StatusBar 
} from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("WelcomeScreen");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={styles.container}>

      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#22C55E" 
      />

      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.loaderContainer}>
        <ActivityIndicator 
          size="large" 
          color="#FFFFFF" 
        />
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 120,
    height: 120,
  },

  loaderContainer: {
    position: 'absolute',
    bottom: 80,
  },
});


export default SplashScreen;