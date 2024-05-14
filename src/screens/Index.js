import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text,TouchableOpacity} from "react-native";
import { Icon, Button } from '@rneui/themed';


import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { size } from "lodash";
import axios from 'axios';

/* import ListaReportes from "../components/Reportes/ListaReportes"; */


export default function Index(props){
    const { navigation } = props;
    const [user, setUser] = useState(true);
    const [restaurants, setRestaurants] = useState([]);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [startRestaurants, setStartRestaurants] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    //limite de registtros
    const [isLoading, setIsLoading] = useState(false);

    //const [offset, setOffset] = useState(5);
    const limitRestaurants = 7;

    const retrieveData = async () => {
            console.log('cargando');

/*         try {
            const valueString = await  AsyncStorage.getItem("IdUsuario");
            const value = JSON.parse(valueString);
            const formData = new FormData();
            formData.append('IdCiudadano', value);
            axios({
                url    : 'http://api.tijuana.gob.mx/API/ObtenerIdCiudadano.php',
                method : 'POST',
                data   : formData,
                headers: {
                             Accept: 'application/json',
                             'Content-Type': 'multipart/form-data',
                             'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
                         }
                     })
                     .then(function (response) {
                        setUserInfo(response.data);
                        setUser(response.data.IdUsuario)
                    })
                    .catch(function (error) {
                             console.log("error from image :");
                    })

        } catch (error) {
            console.log(error);
        } */
        };

   //********************************************************** CARGA LOS  RESTAURANTES ****************************************************************
    //cargar todos los restaurantes y actualiza al entrar la pagina
    // si creo un nuevo restaurante va carga en el momento de la lista.

   useFocusEffect(
    React.useCallback(  () => {   
        retrieveData();

        const resultRestaurants = [];
        const formData = new FormData();    
        formData.append('IdCiudadano', user);
        axios({
            url    : 'http://api.tijuana.gob.mx/API/ConsultarBoletas.php?limitante='+limitRestaurants,
            method : 'POST',
            data   : formData,
            headers: {
                         Accept: 'application/json',
                         'Content-Type': 'multipart/form-data',
                         'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
                     }
                 })
                 .then(function (response) {
                        setTotalRestaurants(size(response.data));
                        setStartRestaurants(response.data[response.data.length - 1]);
                         response.data.forEach((doc) => {
                            //llegar objeto con propiedades reales
                            const restaurant = doc;
                            restaurant.idSolicitud = doc.idSolicitud;
                            resultRestaurants.push(restaurant);
                        });
                        setRestaurants(resultRestaurants);
                })
                .catch(function (error) {
                         console.log("error from image :");
                })
            }, [user])
    );
   //********************************************************** TERMINA DE CARGAR RESTAURANTES ****************************************************************


    const handleLoadMore = () => {
    }

    
    return (
        <View style={styles.viewBody}>

            <Button
            title="Generar Boleta"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={()=>navigation.navigate("add-boleta", {userInfo})}
             />

{/* 
           <ListaReportes restaurants={restaurants} 
             handleLoadMore={handleLoadMore}
             isLoading={isLoading}
           /> */}

        </View>
    )

}

const styles = StyleSheet.create({
viewBody:{
    flex: 1,
    backgroundColor: "#fff",
},
btnContainer:{
    position: "absolute",
    bottom: "20%",
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.5,
},
btnContainerLogin:{
    width: "100%",
    alignContent: "center",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '3%',
    marginBottom: '3%',
    borderBottomWidth: 1,
    backgroundColor: '#B38E5D',
},
btnLogin:{
    backgroundColor: "#992449",
    marginBottom: '3%',
},
});