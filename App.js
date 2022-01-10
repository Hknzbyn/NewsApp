import React from 'react'
import { View, Text,Dimensions,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import News from './src/screens/News';
import TryScreen from './src/screens/TryScreen';

import Listnews from './src/components/Listnews'

const { width, height } = Dimensions.get('window');


export default function App() {
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
       <Listnews/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:width,
    height:height,
    justifyContent:'center',
    alignItems:'center'
  }
})
