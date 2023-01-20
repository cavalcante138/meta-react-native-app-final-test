import { TextInput, View, Text, StyleSheet } from "react-native";

interface Props {
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    label: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoComplete?: 'email' | 'name' | 'password' | 'username';
}

export function InputLemon(
    { placeholder,
        value,
        onChange,
        label,
        keyboardType = 'default',
        autoComplete = 'name'
    }
        : Props
) {
    return (
    <View>
        <Text
        style={styles.text} 
        >{label}</Text>
        <TextInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType={keyboardType}
            autoComplete={autoComplete}
            style={styles.input}
        />
    </View>)
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        padding: 10
    },
    text: {
        fontSize: 14,
        color: '#5b5b5b',
        fontWeight: 'bold',
        fontFamily: 'Karla_700Bold',
        marginBottom: 5
    }
});