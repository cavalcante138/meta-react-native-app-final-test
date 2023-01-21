import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { useAuth } from "../hooks/auth";
import { AvatarHeader } from "./AvatarHeader";
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

    return (
        <View style={styles.container}>
            {canGoBack ? <Pressable
                onPress={() => navigation.goBack()}
                style={styles.leftButton}
            >
                <Text>Go Back</Text></Pressable> : <View
                style={styles.leftButton}
                ></View>}
            <Logo />
            <View style={styles.leftButton}>
                {user.logged && <AvatarHeader user={user} />}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 10
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