import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Card, Image } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InicioAtencion(props) {
    const { navigation, toastRef } = props;
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

    return (
        <View>
            <ScrollView contentContainerStyle={{ paddingBottom: "30%" }}>
                <TouchableOpacity onPress={() => navigation.navigate("boletas-add", { userInfo })}>
                    <Card containerStyle={styles.containerCard}>
                        <Image
                            style={styles.restaurantImage}
                            resizeMode="cover"
                            source={require("../../assets/img/agregar.jpg")}
                        />
                        <View style={styles.titleRating}>
                            <Text style={styles.title}>Generar Boleta</Text>
                        </View>
                        <Text style={styles.description}>Llena los datos para la generacion de la boleta.</Text>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("boletas-lista")}>
                    <Card containerStyle={styles.containerCard}>
                        <Image
                            style={styles.restaurantImage}
                            resizeMode="cover"
                            source={require("../../assets/img/ver.jpg")}
                        />
                        <View style={styles.titleRating}>
                            <Text style={styles.title}>Mis Boletas</Text>
                        </View>
                        <Text style={styles.description}></Text>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 10,
        borderWidth: 0,
        position: "relative",
    },
    restaurantImage: {
        width: "100%",
        height: 300,
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
