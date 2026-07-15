import { View, Text, Animated } from 'react-native'
import {React, useRef, useEffect} from 'react'

const ScaleBox = () => {
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => { 
        Animated.timing(scale, {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true,
        }).start();
    }, []);
  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        width: 200,
        height: 200,
        backgroundColor: 'green',
      }}
    >

    </Animated.View>
  )
}

export default ScaleBox