import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import LoginUI from '../../../Components/Login/LoginUi';
import { useNavigation } from '@react-navigation/native';
export default function OwnerSignin() {
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <LoginUI navigation={navigation} targetScreen="OwnerSignup" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
