import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props{
    label: string;
    isSelected: boolean;
    setSelection: () => void;
}

export function CheckBoxLemon(
    { label, isSelected, setSelection }: Props
){
    return(
        <View style={styles.container}>
        <Checkbox
            value={isSelected}
            color="#495e57"
            onValueChange={setSelection}
            style={{ borderRadius: 2 }}
        />
        <Text style={styles.text}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {        
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Karla_400Regular',
        marginLeft: 7
    }
});