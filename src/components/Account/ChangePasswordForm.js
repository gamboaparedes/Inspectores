import React, {useState} from "react";
import {StyleSheet, View , Text} from "react-native";
import { Input,Button } from '@rneui/themed';

import { size } from "lodash"

export default function ChangePasswordForm(props){
    const { setShowModal,displayIdUsuario, toastRef} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [passwordNewRepeat, setPasswordNewRepeat] = useState('')



   const onSubmit = async () => {
       let isSetErrors = true;

    let errorsTemp = {};
    setErrors({});

       if(!password || !passwordNew || !passwordNewRepeat){
        errorsTemp = {
            password: !password ?  "La contraseña no puede estar vacia" : "",
            newPassword: !passwordNew ? "La contraseña no puede estar vacia" : "",
            repeatNewPassword: !passwordNewRepeat ? "La contraseña no puede estar vacia" : "",
        }
       }else if(passwordNew !== passwordNewRepeat){
           errorsTemp = {
               newPassword: "Las contraseñas no son iguales",
               repeatNewPassword: "Las contraseñas no son iguales",
           };
       }else if (size(passwordNew) < 6){
           errorsTemp = {
               newPassword: "La contraseña tiene que ser mayor a 5 caracteres",
               repeatNewPassword: "La contraseña tiene que ser mayor a 5 caracteres"
           };
       }else{
        setIsLoading(true);
        var formData = new FormData();
        formData.append('idUsuario', displayIdUsuario);
        formData.append('PasswordOld', password);
        formData.append('PasswordNew', passwordNew);
        await fetch("http://api.tijuana.gob.mx/API/ActualizarPassword.php", {
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
            })
            .then(async (response) => response.json())
            .then(async (responseData) => {

                if(responseData.Mensaje=="1"){
                isSetErrors = false
                setIsLoading(false);
                setShowModal(false);
            }else if(responseData.Mensaje=="0"){
                errorsTemp={
                    password: "La contraseña no es correcta"
                }
                setIsLoading(false);

            }
            
            });



        /*
        setIsLoading(true);
        await reauthenticate(formData.password)
        .then(async () =>{
           await firebase.auth().currentUser.updatePassword(formData.newPassword).then(()=>{
               isSetErrors = false
               setIsLoading(false);
               setShowModal(false);
                firebase.auth().signOut();
            }).catch(() => {
            errorsTemp ={
                other:" Error al actualizar la contraseña"
            }    
            setIsLoading(false);
            });

        } ).catch(() =>{
            errorsTemp={
                password: "La contraseña no es correcta"
            }
            setIsLoading(false);
        })
        */

       }
       isSetErrors && setErrors(errorsTemp);
    };

    return (
        <View style={styles.view}>
            <Input  placeholder="Contraseña actual"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={showPassword ? false : true }
            rightIcon={{
                type: "material-community",
                name: showPassword ? "eye-off-outline": "eye-outline",
                color: "#c2c2c2",
                onPress: () => setShowPassword(!showPassword)
            }}
            onChange={e => setPassword(e.nativeEvent.text)}
            errorMessage={errors.password}
            />

            <Input placeholder="Nueva contraseña"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={showPassword ? false : true }
            rightIcon={{
                type: "material-community",
                name: showPassword ? "eye-off-outline": "eye-outline",
                color: "#c2c2c2",
                onPress: () => setShowPassword(!showPassword)
            }}
            onChange={e => setPasswordNew(e.nativeEvent.text)}
            errorMessage={errors.newPassword}
            />
            
            <Input placeholder="Repetir Nueva contraseña"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={showPassword ? false : true }
            rightIcon={{
                type: "material-community",
                name: showPassword ? "eye-off-outline": "eye-outline",
                color: "#c2c2c2",
                onPress: () => setShowPassword(!showPassword)
            }}
            onChange={e => setPasswordNewRepeat(e.nativeEvent.text)}
            errorMessage={errors.repeatNewPassword}
            />

            <Button 
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
        </View>
    )


}

function defaultValue(){
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: "",
    };
}


const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input:{
        marginBottom: 10,
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
    },
    btn:{
        backgroundColor: "#00a680"
    }
});