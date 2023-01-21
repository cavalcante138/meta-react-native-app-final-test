import { View, Image, Text, StyleSheet } from "react-native"
import { User } from "../hooks/auth";

interface Props {
    user: User;
}

export const AvatarHeader = ({ user }: Props) => {
    return <>{user.avatarUrl ? <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} /> :
    <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>
            {user.lastname ? user.name[0] + user.lastname[0] : user.name[0] + user.name[1]}
        </Text>
    </View>}</>
}


const styles = StyleSheet.create({
    avatarPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: '#62d6c4',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    avatarText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Karla_700Bold',
        textTransform: 'uppercase'
    },
});
