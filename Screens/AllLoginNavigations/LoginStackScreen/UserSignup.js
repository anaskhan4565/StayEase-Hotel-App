
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import SignUpUI from '../../../Components/Login/SignUpUI';
import { useNavigation } from '@react-navigation/native';
export default function UserSignup() {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <SignUpUI navigation={navigation} targetscreen={"UserSignin"} />

            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});