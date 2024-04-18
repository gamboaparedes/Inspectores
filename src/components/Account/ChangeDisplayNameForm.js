import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input,Button } from '@rneui/themed';



export default function ChangeDisplayNameForm(props){
    const {displayName,displayApPaterno,displayApMaterno,displayIdUsuario, setShowModal, toastRef, setReloadUserInfo } = props;
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [newApellidoPaterno, setNewApellidoPaterno] = useState(null);
    const [newApellidoMaterno, setNewApellidoMaterno] = useState(null);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)



    const fetchApi = async () => {
        const response = await fetch('http://api.tijuana.gob.mx/API/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              tipo: 'actualizarNombre',  
              idUsuario: displayIdUsuario, //'JCGAMBOA',
              Nombre: newDisplayName,//'123456'
              apPaterno: newApellidoPaterno,//'123456'
              apMaterno: newApellidoMaterno,//'123456'
          })
        });
        const responseJSON = await response.json()
        return Promise.all(responseJSON);
    
      }

    const onSubmit = () => {
        setError(null);
        if(!newDisplayName || !newApellidoMaterno || !newApellidoPaterno) {
            setError("Actualiza todos los campos");
        }else if (displayName === newDisplayName){
            setError("El nombre no puede ser igual que el actual");
        }else{
            setIsLoading(true);

        fetchApi().then((response)=>{
            response.map((usuario, index)=>{
                setIsLoading(false);
                setReloadUserInfo(true);
                setShowModal(false);
          })
        }) .catch(()=> {
            setError("Error al actualizar el nombre.");
            setIsLoading(false);
        });

        }
    };
    //defaultValue={displayName.trim() || ""}
    //defaultValue={displayApPaterno.trim() || ""}
    //defaultValue={displayApMaterno.trim() || ""}
 return (
    <View styles={styles.view}>
        <Input 
            placeholder="Nombre"
            containerStyle={styles.input}
            rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
            }}
            onChange={e => setNewDisplayName(e.nativeEvent.text)}
            errorMessage={error}
        />

            <Input 
            placeholder="Apellido Paterno"
            containerStyle={styles.input}
            rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
            }}
            onChange={e => setNewApellidoPaterno(e.nativeEvent.text)}
            errorMessage={error}
        />

        
            <Input 
            placeholder="Apellido Materno"
            containerStyle={styles.input}
            rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
            }}
            onChange={e => setNewApellidoMaterno(e.nativeEvent.text)}
            errorMessage={error}
        />
        <Button 
            title="Cambiar Nombre"
            containerStyle={StyleSheet.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={isLoading}
        />
    </View>
 );
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
        width: "95%"
    },
    btn:{
        backgroundColor: "#00a680"
    }
});
