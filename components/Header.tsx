import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useAuth } from "../hooks/auth";
import { AvatarHeader } from "./AvatarHeader";
import { Ionicons } from '@expo/vector-icons'; 
import { Logo } from "./Logo";

interface Props {
    navigation: any;
    canGoBack?: boolean;
}

export const Header = ({
    navigation,
    canGoBack = false
}: Props) => {

    const { user } = useAuth();

    const StatusBarHeight: number = getStatusBarHeight();

    return (
        <View style={{ ...styles.container,
        paddingTop: StatusBarHeight + 10,
        }}>
            {canGoBack ? <Pressable
                onPress={() => navigation.goBack()}
                style={styles.leftButton}
            >
                <Ionicons name="md-arrow-back-circle-sharp" size={32} color="#495e57" /></Pressable> : <View
                style={styles.leftButton}
                ></View>}
            <Logo />
            <Pressable style={styles.leftButton} onPress={() => navigation.navigate('Profile')}>
                {user.logged && <AvatarHeader user={user} />}
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
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
    leftButton: {
        width: 40
    },
    rightButton: {
        width: 40
    }
});