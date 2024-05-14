import React,{ useRef,useState} from "react";
import {StyleSheet ,View, ScrollView,Text, Image} from "react-native"
import { Divider } from '@rneui/themed';
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";

export default function Login(){
const toastRef = useRef();
    return (
        <ScrollView>
            <Image source={require("../../../assets/img/logo2.png")} resizeMode ="contain" style={styles.logo} />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={ toastRef }/>
            </View>
            <Divider style={styles.divider} />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
 logo: {
    resizeMode: "contain",
    width: "100%",
    height: 250,
    marginTop: 40,
  },
 viewContainer:{
     marginRight:40,
     marginLeft:40,
 },
 divider:{
    backgroundColor: "#00a680",
    margin: 40,
 },
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});