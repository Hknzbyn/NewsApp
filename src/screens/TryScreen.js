import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import SmallAlert from '../components/SmallAlert';

const { width, height } = Dimensions.get('window');

export default function TryScreen() {
  const [smallAlertStatus, setSmallAlertStatus] = useState(false);
  const [state1, setState1] = useState(false);

  useEffect(() => {
    if (smallAlertStatus === true) {
      setTimeout(() => {
        setSmallAlertStatus(false);
      }, 1500);

      return () => setSmallAlertStatus(false);
    }
  }, [smallAlertStatus]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSmallAlertStatus(true)}
        activeOpacity={0.7}
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
          Press Me Ö.K.
        </Text>
      </TouchableOpacity>
      <Text>Status - {smallAlertStatus}</Text>
      <SmallAlert status={smallAlertStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaOne: {
    width: width,
    height: width,
    //backgroundColor: 'blue',
  },
  areaTwo: {
    width: width,
    height: 100,
    //backgroundColor: 'yellow',
  },
  areaThree: {
    width: width,
    height: width,
    //backgroundColor: 'red',
  },
});
