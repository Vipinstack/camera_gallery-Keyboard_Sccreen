import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './src/Camera';
import Keyboard from './src/Keyboard';

export default function App() {
  return (
    <>
    {/* <Keyboard /> */}
    <Camera />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
