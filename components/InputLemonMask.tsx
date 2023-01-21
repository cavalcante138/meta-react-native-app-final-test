import { TextInput, View, Text, StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

interface Props {
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    label: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoComplete?: 'email' | 'name' | 'password' | 'username';
    mask?: string | undefined;
}

export function InputLemonMask(
    { placeholder,
        value,
        onChange,
        label,
        keyboardType = 'default',
        autoComplete = 'name',
        mask
    }
        : Props
) {
    return (
    <View>
        <Text
        style={styles.text} 
        >{label}</Text>
        <MaskedTextInput
                placeholder={placeholder}
                value={value}
                mask={mask ? mask : undefined}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                style={styles.input} 
                onChangeText={(text: string, rawText: string) => {
                onChange(text)
                }}        
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