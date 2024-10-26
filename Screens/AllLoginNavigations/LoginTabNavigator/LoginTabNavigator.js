import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UserStackNavigation from '../LoginStackNavigation/UserStackNavigation';
import OwnerStackNavigation from '../LoginStackNavigation/OwnerStackNavigation';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

export default function LoginTabNavigator() {
  const Tab = createMaterialBottomTabNavigator();
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#5E35B1', '#8E24AA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <Tab.Navigator
        activeColor="black"
        inactiveColor="white"
        barStyle={styles.tabBar}
      >
        <Tab.Screen
          name="User"
          component={UserStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
            tabBarLabelStyle: { fontFamily: 'Nunito_400Regular', fontSize: 18, fontWeight: 'bold' },
          }}
        />
        <Tab.Screen
          name="Owner"
          component={OwnerStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
            tabBarLabelStyle: { fontFamily: 'Nunito_400Regular', fontSize: 18 },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  tabBar: {
    backgroundColor: 'transparent',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
  },
});
