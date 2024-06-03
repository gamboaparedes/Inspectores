import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, ActivityIndicator , Image} from "react-native";
import { Icon,Button } from '@rneui/themed';
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../api.js';
import {LinearGradient} from 'expo-linear-gradient';

export default function LoginForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const onChange = (value, type) => {
        setFormData({ ...formData, [type]: value });
    }

    const onSubmit = async () => {
        if (isEmpty(usuario) || isEmpty(password)) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else {
            setLoading(true);
            const formData = new FormData();
            formData.append('usuario', usuario);
            formData.append('password', password);

            try {
                const response = await axios.post(`${BASE_URL}/loginApp.php`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    const userData = response.data.user;
                    await AsyncStorage.setItem('UserData', JSON.stringify(userData));
                    toastRef.current.show("Logeado exitosamente");
                    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                } else {
                    toastRef.current.show("Contraseña o Usuario Incorrecto.");
                }
            } catch (error) {
                console.error("Hubo un problema:", error);
                toastRef.current.show("Hubo un problema, inténtelo más tarde.");
            }
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Icon type="material-community" name="at" iconStyle={styles.inputIcon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="example@email.com"
                    value={usuario}
                    onChangeText={text => setUsuario(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon type="material-community" name={showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.inputIcon} onPress={() => setShowPassword(!showPassword)} />
                <TextInput
                    style={styles.textInput}
                    placeholder="*****"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <Text style={styles.forgotPasswordText}>Olvidé mi contraseña Contactar al administrador</Text>

            <View style={styles.signInButtonContainer}>
              <Text style={styles.signIn}>Iniciar</Text>
            <LinearGradient colors={['#F97794', '#623aa2']} style={styles.linearGradient}>
                <Icon type="material-community" name="arrow-right" color={"white"} onPress={onSubmit} size={30}/>
            </LinearGradient>
            </View>
          
            {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />}

        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
    }
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 30,
    },
    inputContainer: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        borderRadius: 20,
        marginHorizontal: 10,
        elevation: 10,
        marginVertical: 20,
        alignItems: "center",
        height: 50,
    },
    inputIcon: {
        color: "#5F5E5E",
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1
    },
    forgotPasswordText: {
        color: "#8E8E8E",
        textAlign: "right",
        width: "90%",
        fontSize: 15,
        marginBottom: 10
    },
    signInButtonContainer:{
      flexDirection: "row",
      marginTop: 120,
      width: "90%",
      justifyContent: "flex-end"
    },
    signIn:{
      color: "#262626",
      fontSize: 35,
      fontWeight: "bold"
    },
   
    linearGradient:{
      height: 44,
      width: 66,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal:10,

    },
 
});
