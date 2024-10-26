import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginTabNavigator from './Screens/AllLoginNavigations/LoginTabNavigator/LoginTabNavigator';
import MainScreen from './Screens/MainScreen/MainScreen';
export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  return (
    
    <NavigationContainer>
      <Stack.Navigator
       >
        <Stack.Screen name='LoginTab' component={LoginTabNavigator}  
        options={{ headerShown: false }} 
        />
        <Stack.Screen name='MainScreen'
         component={MainScreen} 
         options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
