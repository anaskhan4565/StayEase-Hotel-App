import { createStackNavigator } from '@react-navigation/stack';
import OwnerSignin from '../LoginStackScreen/OwnerSignin';
import OwnerSignup from '../LoginStackScreen/OwnerSignup';
import React from 'react';

const Stack = createStackNavigator();

export default function OwnerStackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="OwnerSignin" component={OwnerSignin} options={{ headerShown: false }} />
            <Stack.Screen name="OwnerSignup" component={OwnerSignup} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
