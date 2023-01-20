import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Onboarding } from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from './screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState(false);

  const setUserOnBoard = async (isOnBoard) => {
    try {
        setIsLoading(true);
        await AsyncStorage.setItem('isOnBoard', isOnBoard.toString());
        setIsOnboardingCompleted(true);
    } catch (error) {
        console.log(error);
    }finally {
        setIsLoading(false);
    }
  };

  const isOnBoard = async () => {
    try {
        const value = await AsyncStorage.getItem('isOnBoard');
        if (value === "true") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
  };


  React.useEffect(() => {
    isOnBoard().then((isOnBoard) => {
      setIsOnboardingCompleted(isOnBoard);
      setIsLoading(false);
  });
  }, []);

  const [fontsLoaded] = useFonts({
    Karla_400Regular, 
    Karla_300Light,
    Karla_500Medium,
    Karla_700Bold,
    Karla_800ExtraBold,
    MarkaziText_400Regular,
    MarkaziText_500Medium,
  });




  if (isLoading || !fontsLoaded) {
    // We haven't finished checking for the token yet
    return <Text>Loading</Text>;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <Stack.Screen name="Profile" component={Profile} />
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
