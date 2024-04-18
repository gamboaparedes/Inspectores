import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Account(props) {
  const [login, setLogin] = useState(null);
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () { return true });

    AsyncStorage.getItem("UserData").then((response) => {
      const userData = JSON.parse(response);
      console.log(userData);
      if (userData) {
        setLogin(true);
        setUserData(userData);
      } else {
        setLogin(false);
      }
    });
  }, []);

  if (login === null) return <Loading isVisible={true} text="Cargando..." />;

  return login ? <UserLogged navigation={props.navigation} userData={userData} /> : <UserGuest />;
}
