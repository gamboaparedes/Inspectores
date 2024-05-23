import React,{ useState, useEffect,useRef} from "react";
import {StyleSheet, View, ScrollView, Alert, Dimensions,Text, TouchableOpacity,KeyboardAvoidingView,Modal ,FlatList,SafeAreaView} from "react-native";
import { Icon, Avatar, Image, Input, Button, CheckBox} from '@rneui/themed';

import articulos from '../../../utils/ArticulosActivos';
import { map, size , filter} from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Signature from "./Signature";
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
const WidthScreen = Dimensions.get("window").width;
const heigthScreen = Dimensions.get("window").height;
import ContainerPDF from './printPDF';


export default function AddRestaurantForm(props){ 
    const [data, setdata] = useState([]);

    const ref = useRef();

    const { toastRef, setIsLoading, navigation,userInfo} = props;
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");

    const [Infractor, setInfractor] = useState("");
    const [NombreComercio, setNombreComercio] = useState("");
    const [Calle, setCalle] = useState("");
    const [NoExterior, setNoExterior] = useState("");
    const [NoInterior, setNoInterior] = useState("");
    const [InfraccionCometida, setInfraccionCometida] = useState("");
    const [Observaciones, setObservaciones] = useState("");
    const [base64, setbase64] = useState("");

    const [imageSelected, setImageSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [isVisibleSign, setIsVisibleSign] = useState(false);
    const [state, setState] = useState({currentStep:0,steps:['Catalogo', 'Ubicacion', 'Evidencia', 'Reporte']});
    const [locationRestaurant, setLocationRestaurant] = useState(null);
    const [direccion, setDireccion] = useState("");
    const [colonia, setColonia] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [clasificacionLista, setClasificacionLista] = React.useState('');
    const [idDenuncia, setIdDenuncia] = useState("");

     useEffect(() => {
        navigation.setOptions({title: "Nueva boleta" });
        setdata(articulos);
        const parent = props.navigation.dangerouslyGetParent();
        parent.setOptions({
          tabBarVisible: false
        });
        return () =>
          parent.setOptions({
            tabBarVisible: true
          });
      }, []);


  const onChangeValue = (itemSelected, indexcharacter) => {

    const nextState =  data.map((list, i) =>
      list.id == indexcharacter+1
        // Key matches, spread existing state and update list items array
        ? {
            ...list,
            answers: list.answers.map(item =>
              item.options === itemSelected.options
                // Item id match, spread existing item and update price
                ? {
                    ...item,
                    checked : !item.checked
                  }
                // No item id match, pass existing item
                : item
            )
          }
        // No key match, pass existing list
        : list
    )
          setdata(nextState)
  }
  const renderItem = ({item, index}) => {
    return (
      <View>
            <Text style={styles.title}>{item.apartado}</Text>
            <FlatList
                  data={item.answers}
                  renderItem={({ item }) => 
                    <View style={styles.item}>
                      {item.checked}
                      <CheckBox
                      key={item.options}
                      size={40}
                      checked={item.checked}
                      style={styles.ckItem}
                      onPress={()=> onChangeValue(item, index)}
                    />
                    <View style={styles.WrapText}>
                      <Text>{item.right_ans}</Text>
                    </View>
                  </View>
                }
                  keyExtractor={item => item.options}
                />
      </View>
    )
  }
      
   // toastRef.current.show("Tienes que localizar el reporte en el mapa");
    const addRestarant =  () => {
     /*    if(!Infractor || !NombreComercio || !restaurantAddress){ */
     if(!Infractor){
         toastRef.current.show("Todos los campos del formularios son obligatorios");
     }else if(size(imageSelected) === 0 ){
         toastRef.current.show("El reporte tiene que tener al menos una foto");
      }else if(!locationRestaurant){
         toastRef.current.show("Tienes que localizar el reporte en el mapa");
     }else{
        setState({...state,currentStep: currentStep + 1});
     } 
    };
    const addRestarantSave =  () => {
        setIsLoading(true); 
        var formData = new FormData();
        formData.append('Nombres', userInfo.Nombre);
        formData.append('Paterno', userInfo.ApellidoPaterno);
        formData.append('Materno', userInfo.ApellidoMaterno);
        formData.append('Correo', userInfo.Correo);
        formData.append('Referencias', restaurantAddress);
        formData.append('NoPermiso', restaurantDescription);
        formData.append('UbicacionLat', locationRestaurant.latitude);
        formData.append('UbicacionLon', locationRestaurant.longitude);
        formData.append('IdUsuarioMovil', userInfo.IdUsuario);
        formData.append('Infractor', Infractor);
        formData.append('NombreComercio', NombreComercio);
        formData.append('Calle', Calle);
        formData.append('NoExterior', NoExterior);
        formData.append('NoInterior', NoInterior);
        formData.append('InfraccionCometida', InfraccionCometida);
        formData.append('Observaciones', Observaciones);
        formData.append('clasificacion', clasificacionLista); 
        formData.append('base64', base64);  

        let myItems = [];
        data.forEach(item=>{
          item.answers.forEach(awns=>{ 
            if(awns.checked === true){
              /* contentAlert =  contentAlert +'QUEST ID: '+ `${item.id}.`+'ANSWERS ID:'+awns.options+ `\n`; */
              myItems.push({p:item.id,r:awns.options})
            }
        });
      });
         formData.append('listareglamento', JSON.stringify(myItems)); 
        
        const config = {
            headers: {
              "Content-Type": "multipart/form-data; charset=utf-8;"
            }
          };

        axios.post('http://api.tijuana.gob.mx/API/CrearReporteInspeccion.php',formData, config)
        .then(response => {
            if(response.data>0){
               uploadImageStorage(response.data,userInfo.IdUsuario).then(responseimage =>{
                   setIsLoading(false);
                   setState({...state,currentStep: currentStep + 1});
                   setIdDenuncia(response.data);
                    /* navigation.navigate("restaurants");  */
                }).catch(()=>{
                    setIsLoading(false);
                    toastRef.current.show("Error al subir las fotos, intentelo mas tarde"); 
                }); 
            }else{
                setIsLoading(false);
                toastRef.current.show("Error al subir el reporte, intentelo mas tarde");
            } 
         })
        .catch(error =>{  setIsLoading(false); toastRef.current.show("Error al subir el reporte, intentelo mas tarde"); } ); 

    };
    

    const uploadImageStorage = async (IdFolio, IdUsuario) =>{
        const imageBlob = [];
        await Promise.all(
            //se crea una funcion asincrona para poder esperara a que las imagen se suban
            map(imageSelected, async (image)  => {
                let filename = image.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                    //obtenermos la url de la foto que se subio
               
                const formData = new FormData();
                formData.append('IdFolio', IdFolio );
                formData.append('IdUsuario', IdUsuario);
                formData.append('fileToUpload', { uri: image, name: "App-"+filename, type});
                axios({
                    url    : 'http://api.tijuana.gob.mx/API/subir_FotoMulta.php',
                    method : 'POST',
                    data   : formData,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
                    }
                    })
                    .then(function (response) {
                      imageBlob.push(response.data.respuesta);
                        })
          })
        );
        return imageBlob
    }

	const { steps, currentStep } = state;

    return (
           	<View style={{backgroundColor: '#992449'}}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isVisibleMap}
                        onRequestClose={() => {
                        setIsVisibleMap(!isVisibleMap);
                        }}
                    >
                            <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <Map 
                                isVisibleMap={isVisibleMap} 
                                setIsVisibleMap={setIsVisibleMap}
                                state={state} 
                                setState={setState} 
                                currentStep={currentStep}
                                setLocationRestaurant={setLocationRestaurant} 
                                toastRef={toastRef}
                                setDireccion={setDireccion}
                                setColonia={setColonia}
                                setCodigoPostal={setCodigoPostal}
                                setIsLoading={setIsLoading}
                                />

                            </View>
                            </View>
                    </Modal>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isVisibleSign}
                        onRequestClose={() => {
                        setIsVisibleSign(!isVisibleSign);
                        }}
                    >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.viewForm2}>
                                    <Signature style={{marginTop:32}} setIsVisibleSign={setIsVisibleSign} setbase64={setbase64}/>
                                    </View>
                                </View>
                            </View>
                    </Modal>


				<View style={{backgroundColor: '#fff',marginBottom: -10}}>
				
		            {currentStep == 0 &&    
	                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{height:heigthScreen}}>
                                  {/*   <ImageRestaurant imagenRestaurant={ imageSelected[0] } /> */}
                                    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
                                    <ScrollView nestedScrollEnabled={true} contentContainerStyle={{paddingBottom:"50%"}}>
                                    <Text style={styles.titlePrincipal}>BOLETA DE INFRACCIÓN AL REGLAMENTO DE LIMPIA</Text>
                                    <FormAdd 
                                    setRestaurantAddress={setRestaurantAddress}
                                    setRestaurantDescription={setRestaurantDescription}
                                    setIsVisibleMap={setIsVisibleMap}
                                    locationRestaurant={locationRestaurant}
                                    setInfractor={setInfractor}
                                    setNombreComercio={setNombreComercio}
                                    setCalle={setCalle}
                                    setNoExterior={setNoExterior}
                                    setNoInterior={setNoInterior}
                                    
                                    />
                                    <UploadImage 
                                    toastRef={toastRef} 
                                    imageSelected={imageSelected}
                                    setImageSelected={setImageSelected}
                                    />

                                    <Text style={styles.TextoReglamento}>
                                    Para la notificación de la presente boleta de infraccion se designa inspector C.----QR---
                                    Lo anterior con fundamentos en los Artículos 1, 2, 3, 8, 16 fracción VI, 25 fracción XXIV y 40 del Reglamento de la Administración Pública Municipal del Ayuntamiento de Tijuana, Baja California; a los Artículos 4 fracción III,5 y 27 fraccion II del Reglamento Interno de la Secretaria de Desarrollo Territorial, Urbano y Ambiental de Tijuana, Baja California; y los Articulos 7 fracciones III, X, XI, 46 y 49 del Reglamento de Limpia para Tijuana, Baja California.

                                    </Text>
                                    {
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>                     
                                        <SafeAreaView style={styles.container}>
                                            <FlatList 
                                                style={styles.list}
                                                data={data}
                                                renderItem={renderItem}
                                                keyExtractor={item => item.id}
                                            />
                                    </SafeAreaView>
                                     </View>
                                     }

                                     <Button title="Paso 2" onPress={(addRestarant)} buttonStyle={styles.btnAddRestaurant}/>

                                    </ScrollView>
                                    </KeyboardAvoidingView>

                                </View>

                            </View>
                    }	    
		            {currentStep == 1 &&	
						<View style={{height: heigthScreen, }}>
                            <Button title="Regresar" onPress={() => { setState({...state,currentStep: currentStep - 1});}} buttonStyle={styles.btnAddRestaurantRegresar}/>
                          
                            <View  style={{ borderBottomColor: '#992449',  borderBottomWidth: 4, }}/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',flex:1}}>
                                
                            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1,paddingBottom:"50%" }}>
                                <Input  placeholder="Infracción Cometida" inputContainerStyle={styles.input} onChange={ (e) => setInfraccionCometida(e.nativeEvent.text)}/>
                                <Input  placeholder="Observaciones" inputContainerStyle={styles.input} onChange={ (e) => setObservaciones(e.nativeEvent.text)}/>
                                <Text style={{fontSize:20}}>Clasificación:</Text>

                                <View style={{textAlign:'center', justifyContent: 'space-between', padding: 15}}>
                                <RadioButton.Group onValueChange={clasificacionLista => setClasificacionLista(clasificacionLista)} value={clasificacionLista}>
                                    <RadioButton.Item label="Primera Fracción" value="Primera Fraccion" />
                                    <RadioButton.Item label="Reincidencia" value="Reincidencia" />
                                    </RadioButton.Group>
                                </View>
                                
                                <Text style={styles.TextoReglamento}>
                                El inspeccionado infractor debera presentarse en la Direccion de servicios Publicos Municipales, 
                                oficinas ubicadas en primer nivel de palacio municipal, dentro de los 3 dias habiles siguientes a 
                                aquel en que reciba la presente boleta de infraccion, para que manifieste lo que asu derecho conveniente,
                                 mismo termino que se orotga para que se acredite haber corregido o reparado en daño causado, pudiendo solicitar proroga 
                                 a la direccion si la naturaleza del caso lo requiere
                                </Text>
                                <Text style={{fontSize:20}}>Nombre y firma de quien lo recibe</Text>

                                        <Button
                                title="Realizar Firma"
                                containerStyle={styles.ViewMapBtnContainerCancel}
                                buttonStyle={{  backgroundColor: base64 ? "#09B806": "#a60d0d" }}
                                onPress={() => setIsVisibleSign(true)}
                                />

                        <Text style={{fontSize:20}}>ASEGURATE DE GUARDAR LA INFORMACION</Text>


                                <Button
                                title="Guardar"
                                containerStyle={styles.ViewMapBtnContainerCancel}
                                buttonStyle={styles.viewMapBtnCancel}
                                onPress={addRestarantSave}
                                />


                             </ScrollView>
                             </View>
						</View>
					}
                          
					{currentStep == 2 &&	
          	<View style={{height: heigthScreen,  justifyContent: 'space-between', alignSelf: 'center',}}>
              <ContainerPDF idDenuncia={idDenuncia}/>
            </View>
					}
                    
				</View>
        <ContainerPDF idDenuncia={idDenuncia}/>
			</View>
    )
}


function Map(props){
    const {isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef,setState, state,currentStep, setDireccion, setColonia,setCodigoPostal,setIsLoading} = props;

    const [location, setLocation] = useState({
      latitude: 32.4880534,
      longitude: -117.0233362,
      latitudeDelta: 0.24,
      longitudeDelta: 0.24,
    });
    

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Tienes que ir a ajustes de la app y activar la localización",
        });
        return;
      }

      const locationTemp = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);


    const confirmLocation = () => {
    setLocationRestaurant(location);
    toastRef.current.show("Localizacion guardada correctamente");
    setIsVisibleMap(!isVisibleMap);
    }
    return (
        <View style={styles.viewForm}>
            {location && (
                    <MapView style={styles.mapStyle} 
                    initialRegion={location}
                     showsUserLocation={true} 
                     onRegionChange={(region)=> setLocation(region)} >
                        <MapView.Marker 
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                        <Button title="Guardar Ubicacion" 
                        containerStyle={styles.ViewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                        />
                        <Button
                         title="Cancelar Ubicacion"
                         containerStyle={styles.ViewMapBtnContainerCancel}
                         buttonStyle={styles.viewMapBtnCancel}
                         onPress={() => setIsVisibleMap(!isVisibleMap)}
                         />
                </View>
        </View>
    );
}

function ImageRestaurant(props){
    const { imagenRestaurant } = props;
    return (
        <View style={styles.viewPhoto} >
        <Image source={imagenRestaurant ? {uri: imagenRestaurant} : require("../../../assets/img/no-image.png") } 
        style={{ width: WidthScreen, height: 150}} />
        </View>
    )
}

function FormAdd(props){
   const {setRestaurantAddress, 
    setRestaurantDescription,
     setIsVisibleMap, 
     locationRestaurant,
     setInfractor,
     setNombreComercio,
     setCalle,
     setNoExterior,
     setNoInterior,
    } = props;
    return(
        <View>

            <Input  placeholder="Infractor" inputContainerStyle={styles.input} onChange={ (e) => setInfractor(e.nativeEvent.text)}/>
            <Input  placeholder="Nombre del Comercio" inputContainerStyle={styles.input} onChange={ (e) => setNombreComercio(e.nativeEvent.text)}/>
            <Input  placeholder="Calle" inputContainerStyle={styles.input} onChange={ (e) => setCalle(e.nativeEvent.text)}/>
            <Input  placeholder="No.Exterior" inputContainerStyle={styles.input} onChange={ (e) => setNoExterior(e.nativeEvent.text)}/>
            <Input  placeholder="No.Interior" inputContainerStyle={styles.input} onChange={ (e) => setNoInterior(e.nativeEvent.text)}/>
       
            <Input  
            placeholder="Ubicacion y referencias" 
            containerStyle={styles.input}
            onChange={(e)=> setRestaurantAddress(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name: "google-maps",
                color: locationRestaurant ? "#00a680": "#c2c2c2" ,
                onPress: () => setIsVisibleMap(true),
            }}
            />


            <Input  placeholder="No.Permiso de Operacion" multiline={true} inputContainerStyle={styles.textArea} onChange={ (e) => setRestaurantDescription(e.nativeEvent.text)}/>
        </View>
    )
}


function UploadImage(props){
    const { toastRef, imageSelected, setImageSelected } = props;

    const ImageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA
        );
       
        if (resultPermissions === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos a la galeria , en caso que lo rechazes es necesario ir a justes y permitir el uso de la galeria"
            ,3000);
        }else{
            const result = await ImagePicker.launchCameraAsync({
               /*  allowsEditing: true, */
                aspect: [4,3]
            });      
           
            if(result.cancelled){
                toastRef.current.show(
                " Has cerrado la galeria sin seleccionar ninguna imagen",
                2000);
            }else{
                //setImageSelected(result.uri)
                setImageSelected([...imageSelected, result.uri]);
            }
        }
    }

    const removeImage= (image) =>{
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                    setImageSelected(filter(imageSelected, (imageUrl)=> imageUrl !== image));
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.viewImage}>
            {size(imageSelected) < 5 && (
            <Icon 
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={ImageSelect}
                />
            )}
            {map(imageSelected, (imageRestaurant, index) => (
                <Avatar 
                key={index}
                style={styles.miniatureStyle}
                source={{ uri: imageRestaurant }}
                onPress={()=>removeImage(imageRestaurant)}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    titlePrincipal:{
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
    },
    TextoReglamento:{
        fontSize: 16,
        marginBottom: 10,
        marginTop: '10%',
        textAlign: 'justify',
    },
    container:{
        flex:1,
        marginTop:'10%'
      },
      innerText:{
        textAlign: 'center',
        fontWeight: 'bold'
      },
      list: {
        flex:1,
        padding:10,
        marginBottom:50
      },
      wrapButton:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      button:{
        padding: 16,
        backgroundColor: 'orange'
      },
      item:{
        flexDirection: 'row',
        marginTop: 8,
        padding: 4,
        shadowColor: '#000',
        shadowOffset:{
          width:0, height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5
      },
      row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      },
      WrapText:{
        flex:1,
        marginTop: 16,
        marginLeft: 8
      },
      
      title:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign:'justify'
      },  
      ckItem:{
        marginTop:5
      },
    ScrollView:{
        height: "100%",

    },
    viewForm:{
        marginLeft: 10,
        marginRight: 10,
        width: 500,
        height: 500,
        marginBottom: '50%',
    },
    viewForm2:{
        marginLeft: 10,
        marginRight: 10,
        marginBottom: '20%',
    },
    input:{
        marginBottom: 10,
    },
    textArea:{
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnAddRestaurant:{
        backgroundColor:"#992449",
        margin: 20,
    },
    btnAddRestaurantRegresar:{
        backgroundColor:"#B38E5D",
        margin: 20,
        borderRadius: 20
    },
    viewImage:{
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    containerIcon:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 10,
    },
    viewPhoto:{
        alignItems: "center",
        height: 150,
        marginBottom: 10,
    },
    styleContainerForm:{
        width: "100%",
        height: heigthScreen,
    },
    mapStyle:{
        width: "90%",
        height: heigthScreen,
    },
    viewMapBtn:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: '50%',
        alignSelf: 'center',
        alignContent: 'center',
        padding: '20%',
        paddingHorizontal: 35,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        position: 'absolute',
    },
    viewMapBtn2:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 1,
        alignSelf: 'center',
        alignContent: 'center',
        padding: 10,
        paddingHorizontal: 35,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    ViewMapBtnContainerCancel:{
        paddingLeft: 5,
    },
    viewMapBtnCancel:{
        backgroundColor: "#a60d0d", 
    },
    ViewMapBtnContainerSave:{
        paddingRight: 5,
    },
    viewMapBtnSave:{
        backgroundColor: "#00a680",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        marginBottom: '40%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    });