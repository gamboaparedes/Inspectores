import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Card } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cardsData = [
    { 
        title: "Generar Boleta", 
        imageSource: require("../../assets/img/agregar.jpg"), 
        routeName: "boletas-add" 
    },
    { 
        title: "Mis Boletas", 
        imageSource: require("../../assets/img/ver.jpg"), 
        routeName: "boletas-lista" 
    }
];

export default function InicioAtencion({ navigation }) {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('UserData');
                if (userData) {
                    setUserInfo(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleCardPress = (routeName) => {
        navigation.navigate(routeName, { userInfo });
    };

    return (
        <View>
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Bienvenido</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: "30%" }}>
                {cardsData.map((card, index) => (
                    <TouchableOpacity 
                        key={index} 
                        onPress={() => handleCardPress(card.routeName)}
                    >
                        <Card containerStyle={styles.containerCard}>
                            <Image
                                style={styles.restaurantImage}
                                resizeMode="cover"
                                source={card.imageSource}
                            />
                            <View style={styles.titleRating}>
                                <Text style={styles.title}>{card.title}</Text>
                            </View>
                            <Text style={styles.description}>
                                {card.title === "Generar Boleta" && 
                                    "Llena los datos para la generacion de la boleta."
                                }
                            </Text>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 5,
        borderWidth: 0,
        
    },
    helloContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        height: "10%",
    },
    helloText: {
        fontSize: 30,
        fontWeight: "500",
        color: "white",
    },
    restaurantImage: {
        width: "70%",
        height: 200,
        alignSelf: 'center', // Centrar la imagen horizontalmente
    },
    titleRating: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        color: "grey",
        marginTop: 0,
        textAlign: "center",
    },
});
