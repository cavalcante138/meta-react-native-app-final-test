import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';


export interface User{
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    emailNotification: emailNotifications;
    avatarUrl: string;
    logged: boolean;
}

interface OnBoardingCredentials{
    name: string;
    lastname: string;
    email: string;
}

interface emailNotifications {
    orderStatuses: boolean,
    passwordChanges: boolean,
    specialOffers: boolean,
    newsletter: boolean,
}

interface AuthContextData{
    user: User;
    singIn: (credentials: OnBoardingCredentials) => Promise<void>;
    singOut: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    loading: boolean;
    loadStorageData: () => Promise<void>;
}

interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps){
    const [data, setData] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    async function singOut(){
        try {
        AsyncStorage.removeItem('user');
        setData({} as User);
        } catch (error) {
            throw new Error(error);
        }
    }

    async function updateUser(user: User) {
        try {
            setLoading(true);
            const jsonUser = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonUser);
            setData(user);
        } catch (error) {
           throw new Error(error);
        }
    }

    async function singIn({ name, lastname, email} : OnBoardingCredentials){
        try {
            setLoading(true);
            const jsonUser = JSON.stringify({
                name,
                email,
                lastname,
                logged: true
            });
            await AsyncStorage.setItem('user', jsonUser);
            setData({
                name,
                email,
                lastname,
                logged: true
            } as User);
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    }

    async function loadStorageData(){
        const user = await AsyncStorage.getItem('user');
        const jsonUser = JSON.parse(user)
        if(jsonUser){
            setData(jsonUser);
        }
        setLoading(false);
    }

    

    return (
        <AuthContext.Provider
        value={{
            user: data,
            singIn,
            singOut,
            updateUser,
            loadStorageData,
            loading
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }