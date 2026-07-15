import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';

const ParallelBox = () => {
  // 1. Initialize individual drivers for different properties
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. Execute all three animations concurrently
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 7500,
        useNativeDriver: true, // Native performance optimization
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 4000, // Can have different durations
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 8, // Rotate 8 full turns (8 * 360 degrees)
        duration: 8000,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 200,
        duration: 4500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 3. Interpolate the rotation value from 0-1 into degrees
  const spin = rotate.interpolate({
    inputRange: [0, 1]  , // Maps the animation value from 0 to 1
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'darkorange',
        opacity: opacity, // Applied here
        transform: [
          { scale: scale }, // Applied here
          { rotate: spin }, // Applied here
          { translateX: slide }, // Applied here
        ],
      }}
    />
  );
};

export default ParallelBox;
