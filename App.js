import { StatusBar } from 'expo-status-bar';
import { ImageBackgroundComponent, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { AuthContext, AuthProvider } from './authcontext';
import AppNavigation from './navigation/appNavigatin';

export default function App() {
  return (
    
    <AuthProvider> 
     
      <AppNavigation/>
    
    </AuthProvider>
  );
}
