import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SlideBox from './SlideBox';
import FadeInBox from './FadeInBox';
import ScaleBox from './ScaleBox';
import ParallelBox from './ParallelBox';

export default function App() {
  return (
    <View style={styles.container}>
      <FadeInBox />
    <SlideBox />
    <ScaleBox />
    <ParallelBox />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});