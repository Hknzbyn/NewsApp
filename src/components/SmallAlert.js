import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SmallAlert(props) {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const status = props.status;
  //const [status, setStatus] = useState(props.status);

  useEffect(() => {
    if (status === true) {
      startAnimation();

      return () => {
        resetAnimation();
      };
    } else {
      resetAnimation();
    }
  }, [status]);

  const startAnimation = async () => {
    Animated.sequence([
      Animated.timing(animation, {
        duration: 0,
        useNativeDriver: false,
        toValue: 1,
      }),
      Animated.delay(1250),

      Animated.timing(animation, {
        duration: 250,
        useNativeDriver: false,
        toValue: 0,
      }),
    ]).start();
  };

  const resetAnimation = async () => {
    Animated.timing(animation, {
      duration: 0,
      useNativeDriver: false,
      toValue: 0,
    }).start();
  };

  const opacityinterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.8],
  });

  const AnimatedStyles = {
    opacity: opacityinterpolate,
  };
  return (
    <View style={styles.smallAlertContainer}>
      <Animated.View style={[styles.smallAlert, AnimatedStyles]}>
        <Text numberOfLines={1} style={styles.text}>
          {props.AlertText}
        </Text>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  smallAlertContainer: {},
  smallAlert: {
    maxWidth: 300,
    minWidth: 125,
    height: 40,
    //marginBottom:20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    //elevation: 2,
    backgroundColor: 'rgba(101, 101, 101, 0.5)',
  },
  text: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
});
