import React,{useEffect} from "react";
import { StyleSheet, View, ScrollView, Text, Image} from "react-native";
import { Button } from '@rneui/themed';
import {NavigationHelpersContext, useNavigation } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar";
import Onboarding from "./Onboarding";

export default function UserGuest(){
    const navigation = useNavigation();

    useEffect(() => {
       /*  const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
          tabBarVisible: false
        });
        return () =>
          parent.setOptions({
            tabBarVisible: true
          }); */
      }, []);

    return (
    <View style={styles.container}>
       <Onboarding />
       <StatusBar style="auto"/>
    </View>
    )
}

export const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    content: {
      marginHorizontal: 30,
    },
    image: {
      resizeMode: "contain",
      height: 300,
      width: "100%",
      marginBottom: 40,
      borderRadius: 10,
      marginTop: 40,
    },
    title: {
      fontWeight: "bold",
      fontSize: 19,
      marginBottom: 10,
      textAlign: "center",
    },
    description: {
      textAlign: "center",
      marginBottom: 20,
    },
    btnStyle: {
      backgroundColor: "#992449",
    },
  });