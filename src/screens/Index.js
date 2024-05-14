import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet,ScrollView,TouchableOpacity} from "react-native";
import { Card, Image } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function InicioAtencion(props){
    const { navigation } = props;

    const [userInfo, setUserInfo] = useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(false);

/* 
    useEffect(() => {
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
         }, [reloadUserInfo]) */

 return (
   <View>
    <ScrollView contentContainerStyle={{paddingBottom:"30%"}}>

    <TouchableOpacity onPress={()=> navigation.navigate("boletas-add",{userInfo : userInfo,})}>   
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


    <TouchableOpacity onPress={()=> navigation.navigate("pago-predial")} >   
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

 )
}


const styles = StyleSheet.create({
    containerCard: {
      marginBottom: 10,
      borderWidth: 0,
      position: "relative",
    },
    containerProximo: {
      marginBottom: 10,
      borderWidth: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 11,
      },
      shadowOpacity: 0.57,
      shadowRadius: 15.19,
      
      elevation: 23,
      backgroundColor: 'rgba(211, 215, 220, 0.7)'
    },
    
    proximamente:{
       fontSize: 20,
      fontWeight: "bold",
      textAlign:"center"
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
    titleProximo: {
      fontSize: 15,
    },
    description: {
      color: "grey",
      marginTop: 0,
      textAlign: "center",
    },
  });