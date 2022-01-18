import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');


//Open news after 1500 milliseconds
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('News')
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        resizeMode='center'
        source={require('../../assets/news_icon.png')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181D31',
  },
});
