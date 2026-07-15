import { View, Text, Animated } from 'react-native'
import {React, useRef, useEffect} from 'react'

const SlideBox = () => {
    const position = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(position, {
            toValue: 200,
            duration: 4500,
            useNativeDriver: true,
        }).start();
    }, []);

  return (
    <Animated.View 
        style={{
            transform: [{ translateX: position }],
            width: 200,
            height: 200,
            backgroundColor: 'red',
        }}>

    </Animated.View>
  )
}

export default SlideBox