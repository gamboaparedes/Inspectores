import React, {useRef, useEffect ,useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import Toast from "react-native-easy-toast";
import { Button } from '@rneui/themed';
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";
import AsyncStorage from '@react-native-async-storage/async-storage';

//import {  useNavigation } from "@react-navigation/native";
import {  useNavigation } from "@react-navigation/native";

export default function UserLogged(){

    const [userInfo, setUserInfo] = useState(null);
    const [IdUsuario, setIdUsuario] = useState(null)
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const toastRef = useRef();
    const navigation = useNavigation();
    
    const clearStorage = () => {
        AsyncStorage.clear()
        navigation.push('account');
     }

    
    /*  useEffect(() => {
        navigation.setOptions({title: "Mi perfil" });
    
         (async ()=> {
            AsyncStorage.getItem("IdUsuario").then((response) => {
                const currentData = JSON.parse(response);
                var formData = new FormData();
                formData.append('IdCiudadano', currentData);
                 fetch("http://api.tijuana.gob.mx/API/ObtenerIdCiudadano.php", {
                    method: "POST",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                    })
                    .then((response) => response.json())
                    .then((responseData) => {
                      setUserInfo(responseData);
                    });
            });
          })();
            setReloadUserInfo(false);
            }, [reloadUserInfo])
    */
    return (

    <View style={styles.viewUserInfo}>
       <Text>Entraste como un usuario normal</Text>
    </View>
);

}

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2",

    },
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 3,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnCloseSessionText:{
        color: "#00a680",
    }
});