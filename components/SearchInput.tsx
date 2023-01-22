import { TextInput, View, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

interface Props {
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    label: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoComplete?: 'email' | 'name' | 'password' | 'username';
}

export function SearchInput(
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
    <View style={styles.container}>
        <View>
        <FontAwesome name="search" size={20} color="#666" />
        </View>
        <TextInput
                placeholder={placeholder}
                value={value}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                style={styles.input} 
                onChange={(event) => {
                onChange(event.nativeEvent.text.replace(" ", ""))
                }}        
            />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    input: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10, 
        width: '98%',
        height: 40
    },
});