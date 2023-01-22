import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {  Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/auth';
import { Profile } from '../screens/Profile';
import { Onboarding } from '../screens/Onboarding';
import { Logo } from '../components/Logo';
import { Header } from '../components/Header';
import { Home } from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function Routes() {

  const { loadStorageData, user } = useAuth();

  useEffect(() => {
        loadStorageData()
  }, [])
  

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={
        { headerTitle: () => <Logo />,
        headerRight: () => <Text>Lemon</Text>,
        header: (props) => <Header 
        navigation={props.navigation} 
        />,
    }
    }
      >
        {user.logged ? (
        <>
          <Stack.Screen name="Home" component={Home}
          options={
            {
                animation: "none",
            }
            }
          />
          <Stack.Screen name="Profile" component={Profile}
          options={
            {
                header: (props) => <Header 
                navigation={props.navigation} 
                canGoBack={true}
                />,
            }
          }
          />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding}
          options={
            {
                animation: "none",
            }
          }
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
