import React, {useState}  from "react";
import {StyleSheet , View, Text } from "react-native";
import { Input,Icon,Button } from '@rneui/themed';
import { isEmpty } from "lodash";
import {  useNavigation } from "@react-navigation/native";
import Loading from "../Loading.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LoginForm(props){
    
const { toastRef } = props;
const [showPassword, setshowPassword] = useState(false);
const [formData, setFormData] = useState(defaultFormValue());
const [loading, setLoading] = useState(false);
const [usuario, setUsuario] = useState(null);
const [password, setPassword] = useState(null);
const navigation = useNavigation();


const onChange = (e, type) =>{
    setFormData({...formData, [type]: e.nativeEvent.text});
}


const onSubmit = async () => {
    if (isEmpty(usuario) || isEmpty(password)) {
        toastRef.current.show("Todos los campos son obligatorios");
    } else {
        setLoading(true);
        const formData = new FormData();
        formData.append('usuario', usuario);
        formData.append('password', password);
        console.log('entrando');

        try {
            const response = await axios.post("http://192.168.3.4/api/loginApp.php", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            if (response.data.success) {
                const userData = response.data.user;
                // Aquí guardamos los datos del usuario en AsyncStorage
                AsyncStorage.setItem('UserData', JSON.stringify(userData));
                toastRef.current.show("Logeado exitosamente");
                // Aquí navegamos a la pantalla "account" y pasamos los datos del usuario como parámetros
               /*  navigation.navigate("account", { userData: userData }); */
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            } else {
                toastRef.current.show("Contraseña o Usuario Incorrecto.");
            }
        } catch (error) {
            console.error("Hubo un problema:", error);
            toastRef.current.show("Hubo un problema, intentelo mas tarde.");
        }
        setLoading(false);
    }
}

return (
    <View style={styles.formContainer}>

        <Text style={styles.txtForm}>Correo Electrónico o Usuario </Text>
        <Input 
         placeholder="example@email.com"
         containerStyle={styles.inputForm}
         onChange={e =>  setUsuario(e.nativeEvent.text)}
         rightIcon={
             <Icon 
                type="material-community"
                name="at"
                iconStyle={styles.iconRight}
             />
         }
        />
        <Text style={styles.txtForm}>Contraseña</Text>
        <Input 
        placeholder="*****"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={e =>  setPassword(e.nativeEvent.text)}
        rightIcon={
            <Icon 
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={()=> setshowPassword(!showPassword)}
            />
        }
        />
        <Button
            title="Iniciar Sesion"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
        />
        <Loading isVisible={loading} text="Iniciando sesión" />

    </View>
);
}

function defaultFormValue(){

    return {
        email: "",
        password: "",
    }
}
const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
        
    },
    inputForm:{
        width: "100%",
        marginTop:20,
    },
    txtForm:{
        width: "95%",
        marginTop:20,
        color:"#5F5E5E",
        fontWeight: "bold",
    },
    btnContainerLogin:{
        width: "95%",
        marginTop: 20,
    },
    btnLogin:{
        backgroundColor: "#5F5E5E"
    },
    iconRight:{
        color:"#c1c1c1",
    },
});