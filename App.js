import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native-safe-area-context';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Listnews from './src/components/Listnews';
import ButtonsArea from './src/components/ButtonsArea';

import News from './src/screens/News';
import TryScreen from './src/screens/TryScreen';
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
      <RootStack.Navigator initialRouteName='Listnews'>
        <RootStack.Screen
          name='Listnews'
          component={Listnews}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name='News'
          component={News}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name='TryScreen'
          component={TryScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name='SavedNews'
          component={SavedNews}
          options={{
            headerShown: true,
            headerTitle: 'KAYDEDİLEN HABERLER',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontSize: 25,
              fontWeight: '800',
            },
            headerStyle: {
              //borderWidth: 0.5,

              backgroundColor: '#678983' /* #333333*/,
            },
          }}
        />

        <RootStack.Screen
          name='ButtonsArea'
          component={ButtonsArea}
          options={{ headerShown: true }}
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
