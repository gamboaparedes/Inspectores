import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from '@rneui/themed';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props){
    const {
        userInfo: {photoURL,IdUsuario,Nombre,ApellidoMaterno,ApellidoPaterno,Correo},
        toastRef,
        setLoading,
        setLoadingText,
        setReloadUserInfo,
     } = props;
     
  


    const changeAvatar = async () =>{
       const resultPermision = await Permissions.askAsync(Permissions.CAMERA);
       const resultPermissionCamera = resultPermision.permissions.camera.status;

       if(resultPermissionCamera === "denied"){
        toastRef.current.show("Es necesario aceptar los permisos de la galeria");
       } else{
           const result = await ImagePicker.launchImageLibraryAsync({
               allowsEditing: true,
               aspect: [4,3]
           });

           if(result.cancelled){
               toastRef.current.show("Has cerrado la selecion de imagenes");
           }else{
            uploadImage(result.uri).then ((response) => {
                updatePhotoUrl(response);
            }).catch(() => {
                toastRef.current.show("Error al actualizar el avatar");
                setLoading(false);
            })
           }
       }

    }
  

    const uploadImage = async (uri) =>{
        setLoadingText("Actualizando avatar");
        setLoading(true);
       var retorno = null;
             let filename = uri.split('/').pop();
             //let fileExtension = uri.substr(uri.lastIndexOf('.') + 1);
             //let filename = "img-"+IdUsuario+"."+fileExtension;

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('fileToUpload', { uri: uri, name: filename, type });

             await fetch('http://api.tijuana.gob.mx/api/subir_foto.php', {
                method: 'POST',
                body: formData,
                headers: {
                'content-type': 'multipart/form-data',
                'Accept':'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                retorno=  responseData.respuesta;
            });

           return retorno;
    } 
    
    const updatePhotoUrl = async (response) => {

        var formData = new FormData();
        formData.append('idUsuario', IdUsuario);
        formData.append('FotoURL', response);
        
         fetch("http://api.tijuana.gob.mx/API/ActualizarFotoURL.php", {
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
            })
            .then(async (response) => response.json())
            .then(async (responseData) => {
                if(responseData.mensaje=="1"){
                setLoading(false);
                setReloadUserInfo(true);
            }else if(responseData.mesaje=="0"){
                toastRef.current.show("Error al actualizar el avatar");
                setLoading(false);
            }
    })
}

    return (
        <View style={styles.viewUserInfo}>
           <Avatar 
            rounded
            size="large"
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={
                photoURL ? {uri:photoURL}
                : require("../../../assets/img/avatar-default.jpg")
            }
           />
           <View>
               <Text style={styles.displayName}>
                 {Nombre ? Nombre.trim()+" "+ApellidoPaterno.trim()+" "+ApellidoMaterno.trim() : "Anonimo"}
               </Text>
               <Text>
                  {Correo ? Correo.trim() : "Social Login"} 
               </Text>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar:{
        marginRight: 20,
    },
    displayName:{
        fontWeight: "bold",
        paddingBottom: 5,
    }

});