import React, { useRef } from "react";
import {StyleSheet ,View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Toast from "react-native-easy-toast";

import RegisterForm from "../../components/Account/RegisterForm"


export default function Register(){
    const toastRef = useRef();

    return (
        <KeyboardAwareScrollView>
            <Image 
            source={require("../../../assets/img/logo_oficial.png")}
            resizeMode="contain"
            style={styles.logo}
            />
            <View style={styles.viewForm}>
                <Text></Text>
                <RegisterForm toastRef={toastRef} />
            </View>
            <Toast ref={toastRef} position="bottom" opacity={0.9} />
        </KeyboardAwareScrollView>
    );

}

const styles = StyleSheet.create({
    logo:{
        width: "100%",
        height: 150,
        marginTop: 10,
    },
    viewForm:{
        marginRight: 40,
        marginLeft: 40,
    },

});