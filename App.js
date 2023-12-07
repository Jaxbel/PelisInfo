import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator1 from './Navegations/StackNavegator';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import useAuth from './Settings/useAuth';
import DrawerNavigator1 from './Navegations/DrawerNavegator';

const Stack = createStackNavigator();

export default function App() {
  const {user} = useAuth();
  return (
      <NavigationContainer>

        {user ? 
        (
          
          <DrawerNavigator1/>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, title: "Login" }}/>
          </Stack.Navigator>
        )}
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22092C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DrawerNavigator1: {
    backgroundColor: 'White',
    
  },
});