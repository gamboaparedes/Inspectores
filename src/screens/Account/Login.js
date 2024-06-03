import React, { useRef, useState } from "react";
import { StyleSheet, View, ScrollView, Text, Image, Dimensions, KeyboardAvoidingView } from "react-native";
import { Divider } from '@rneui/themed';
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get('window');

export default function Login() {
    const toastRef = useRef();
    return (
        <View style={styles.container} >
                <View style={styles.topImageContainer}>
                    <Image source={require("../../../assets/img/topVector.png")} style={styles.topImage} />
                </View>
                <View style={styles.helloContainer}>
                    <Text style={styles.helloText}>Inspecto</Text>
                </View>
                <View>
                    <Text style={styles.signInText}>Inicia Sesion con tu cuenta</Text>
                </View>
                <View style={styles.viewContainer}>
                    <LoginForm toastRef={toastRef} />
                </View>
                <Toast ref={toastRef} position="center" opacity={0.9} />
            <View style={styles.leftVectorContainer}>
                <Image source={require("../../../assets/img/bottomVector.png")} style={styles.leftVectorImage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
    },
    topImage: {
        width: "auto",
        height: "auto",
        aspectRatio: 16 / 5,
    },
    helloContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    helloText: {
        fontSize: 70,
        fontWeight: "500",
        color: "#262626",
    },
    signInText: {
        textAlign: "center",
        fontSize: 18,
        color: "#262626"
    },
    viewContainer: {
        marginHorizontal: width * 0.1,
        marginBottom: height * 0.05,
    },
    leftVectorContainer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0, // Para asegurar que ocupe todo el ancho de la pantalla
        zIndex: 999,
    },
    leftVectorImage: {
        aspectRatio: 3 / 7,
        width: "100%",
    }
});
