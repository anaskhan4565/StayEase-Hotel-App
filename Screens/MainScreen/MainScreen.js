import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


export default function MainScreen() {
    const Stack = createStackNavigator();


    return (
     <View>
        <Text>Main Screen</Text>
     </View>
    )
}
const styles = StyleSheet.create({
    container: {

    },
});