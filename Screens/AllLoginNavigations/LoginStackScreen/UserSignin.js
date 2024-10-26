import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginUI from '../../../Components/Login/LoginUi';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserSignin() {
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <LoginUI navigation={navigation} targetScreen="UserSignup" />

            </SafeAreaView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'brown',
    },
});
