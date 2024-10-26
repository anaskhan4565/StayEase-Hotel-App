import { createStackNavigator } from '@react-navigation/stack';
import UserSignin from '../LoginStackScreen/UserSignin';
import UserSignup from '../LoginStackScreen/UserSignup';
import React from 'react';

const Stack = createStackNavigator();

export default function UserStackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserSignin" component={UserSignin} options={{ headerShown: false }} />
            <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
