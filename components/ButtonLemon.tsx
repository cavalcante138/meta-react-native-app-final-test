import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';


interface Props {
    onPress: () => void;
    title: string;
    backgroundColor?: string;
    color?: string;
    pressedBgColor?: string;
    pressedColor?: string;
    borderColor?: string;
}

export function ButtonLemon({
    onPress,
    title,
    backgroundColor = '#495e57',
    color = '#fff',
    pressedBgColor = '#495e57e4',
    pressedColor = '#fff',
    borderColor = '#495e57'
}: Props) {
  return(
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            {
                backgroundColor: pressed
                ? pressedBgColor
                : backgroundColor,
                borderColor: borderColor,
            },
            styles.wrapperCustom
        ]}
    >
        {({ pressed }) => (
            <Text style={{ ...styles.text, color: pressed ? pressedColor : color}}>
                {title}
            </Text>
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
    wrapperCustom: {
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Karla_700Bold'
    }
});
