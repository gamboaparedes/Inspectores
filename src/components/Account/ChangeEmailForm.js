import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import { Input,Button } from '@rneui/themed';
import { validateEmail } from  "../../utils/validation"


export default function ChangeEmailForm(props){
    const {email,displayIdUsuario, setShowModal, toastRef, setReloadUserInfo} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)
    

   const onSubmit = (() => {
       setErrors({});
        if(!Email || email === Email){
            setErrors({
                email: "El email no ha cambiado",
            });
        }else if(!validateEmail(Email)){
            setErrors({
                email: "Email incorrecto",
            });
        }else if(!Password){
            setErrors({
                password: "La contraeña no puede estar vacia",
            });
        }else{
            setIsLoading(true);

                    var formData = new FormData();
                    formData.append('idUsuario', displayIdUsuario);
                    formData.append('Correo', Email);
                    formData.append('Password', Password);
                     fetch("http://api.tijuana.gob.mx/API/ActualizarCorreo.php", {
                        method: "POST",
                        headers:{
                            'Accept':'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        body: formData
                        })
                        .then((response) => response.json())
                        .then((responseData) => {
                          if(responseData.Mensaje=="1"){
                            setIsLoading(false);
                            setReloadUserInfo(true);
                            toastRef.current.show("Email actualizado correctamente");
                            setShowModal(false);
                         
                        }else if(responseData.Mensaje=="0"){
                            setIsLoading(false);
                            setErrors({password: "La contraseña no es correcta."});
                        }
                        });
        }
   });

    return (
        <View style={styles.view}>
            <Input 
            placeholder="Correo Electronico"
            containerStyle={styles.input}
            defaultValue= {email.trim() || ""}
            rightIcon={{
                type: "material-community",
                name: "at",
                color: "#c2c2c2",
            }}
            onChange={e => setEmail(e.nativeEvent.text)}
            errorMessage={errors.email}
            />

            <Input
             placeholder="Contraseña"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={showPassword ? false : true}
            rightIcon={{
                type: "material-community",
                name: showPassword ? "eye-off-outline": "eye-outline",
                color: "#c2c2c2c2",
                onPress: () => setShowPassword(!showPassword),
            }}
            onChange={e => setPassword(e.nativeEvent.text)}
            errorMessage={errors.password}
            />

            <Button title="Cambiar Email"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={isLoading}
            />
        </View>


    )
 
}

function defaultValue() {
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input:{
        marginBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
    },
    btn:{
        backgroundColor: "#00a680",
    }

})