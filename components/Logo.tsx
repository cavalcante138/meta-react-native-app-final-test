import { View, Text, StyleSheet, Image } from "react-native";

export function Logo() {
    return (
    <View style={styles.container}>
        <Image 
        source={require('../assets/logo-icon.png')}
        style={styles.icon}
        />
        <Text style={styles.titulo}>Little Lemon</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: { 
        width: 30,
        height: 50,
        objectFit: 'contain'
    },
    titulo: {
        fontSize: 22,
        color: '#495e57',
        fontWeight: 'bold',
        fontFamily: 'MarkaziText_400Regular',
        marginLeft: 5
    }
});