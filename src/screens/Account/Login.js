import React,{ useRef,useState} from "react";
import {StyleSheet ,View, ScrollView,Text, Image} from "react-native"
import { Icon,Button,Divider } from '@rneui/themed';
import {  useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";

export default function Login(){
const toastRef = useRef();


const [result, setResult] = useState(null);

const _handlePressButtonAsync = async () => {
  let result = await WebBrowser.openBrowserAsync('https://www.tijuana.gob.mx/citas/restaurar.aspx');
  setResult(result);
};

    return (
        <ScrollView>
            <Image 
            source={require("../../../assets/img/logo2.png")}
            resizeMode ="contain"
            style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={ toastRef }/>
                {/* <CreateAccount /> */}
            </View>
            <Divider style={styles.divider} />
            <View style={styles.container}>
         {/*    <Button title="¿Olvidaste tu contraseña?" 
             icon={{
                name: "lock-question",
                type:'material-community',
                size: 25 ,
                color: "white"
            }}
  buttonStyle={styles.btnOlvide}
  onPress={_handlePressButtonAsync}/> */}
            </View>

            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    );
}

function CreateAccount(){
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegister}>¿Aun no tienes una cuenta?{" "}
        <Text
         style={styles.btnRegister}
         onPress={()=> navigation.navigate("register")}
         >Registrate</Text>
        </Text>
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
 textRegister:{
     marginTop: 15,
     marginLeft: 10,
     marginRight: 10,
 },
 btnRegister:{
     color: "#992449",
     fontWeight: "bold",
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
  btnOlvide:{
    width: "100%",
    backgroundColor: '#B38E5D',
    
  },
});