import { View, Text, Image, StyleSheet } from "react-native";

export const MainBanner = ({children}) => {
    return (
        <View style={styles.container}>
        <Text style={styles.bannerTitle}>Little Lemon</Text>
        <View style={styles.banner}>
            <View style={styles.bannerText}>

            <Text style={styles.bannerSubtitle}>Chicago</Text>
            <Text style={styles.bannerParagraph}>We are a family owned Medditerranean 
            restaurant, focused on traditional 
            recipes served with a modern twist.</Text>
            </View>
            <View style={styles.bannerImage}>
            <Image
                style={styles.image}
                source={require("../assets/banner.jpg")}
            />
            </View>    
        </View>
        {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#495e57",
        padding: 10,
        paddingBottom: 20,
    },
    banner: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: 20,
    },
    bannerText: {
        width: '50%',
    },
    bannerTitle: {
        fontSize: 48,
        fontFamily: "MarkaziText_500Medium",
        color: "#f1cf48",
    },
    bannerParagraph: {
        fontSize: 15,
        fontFamily: "Karla_400Regular",
        color: "#FFF",
    },
    bannerSubtitle: {
        fontSize: 36,
        fontFamily: "MarkaziText_500Medium",
        color: "#FFF",
    },
    bannerImage: {
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
});