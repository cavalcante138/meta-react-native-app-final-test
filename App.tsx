import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { 
  Karla_300Light,
  Karla_400Regular,
  Karla_500Medium,
  Karla_700Bold,
  Karla_800ExtraBold } from '@expo-google-fonts/karla';
import {
  MarkaziText_400Regular,
  MarkaziText_500Medium,
} from '@expo-google-fonts/markazi-text'
import Routes from './routes/Routes';
import { AppProvider } from './hooks/AppProvider';
import { ToastProvider } from 'react-native-toast-notifications'


export default function App() {
  
  const [fontsLoaded] = useFonts({
    Karla_400Regular, 
    Karla_300Light,
    Karla_500Medium,
    Karla_700Bold,
    Karla_800ExtraBold,
    MarkaziText_400Regular,
    MarkaziText_500Medium,
  });




  if (!fontsLoaded) {
    // We haven't finished checking for the token yet
    return <Text>Loading</Text>;
  }


  return (
    <ToastProvider
    offsetTop={60}
    >
      <AppProvider>
        <Routes />
      </AppProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
