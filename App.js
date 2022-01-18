import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native-safe-area-context';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import News from './src/screens/News';
import SplashScreen from './src/screens/SplashScreen';
import SavedNews from './src/screens/SavedNews';

// React Navigation Stacks
const RootStack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor='#181D31' style='light' />

      <AppWrapper />
    </SafeAreaView>
  );
}

const AppWrapper = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='SplashScreen'>
        <RootStack.Screen
          name='News'
          component={News}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name='SavedNews'
          component={SavedNews}
          options={{
            headerShown: true,
            headerTitle: 'Kaydedilenler',
            headerTitleAlign: 'center',
            headerTintColor: 'white',

            headerTitleStyle: {
              color: 'white',
              fontSize: 25,
              fontWeight: '800',
            },
            headerStyle: {
              //borderWidth: 0.5,

              backgroundColor: '#181D31' /* #333333*/,
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
