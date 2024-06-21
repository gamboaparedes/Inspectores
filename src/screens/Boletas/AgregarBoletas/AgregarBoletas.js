import React,{ useState, useEffect,useRef} from "react";
import {View, ScrollView, Dimensions,Text,KeyboardAvoidingView,Modal ,FlatList} from "react-native";
import {Input, Button, CheckBox, Icon} from '@rneui/themed';

import articulos from '../../../utils/ArticulosActivos';
import {size} from "lodash";
import Signature from "../Signature/Signature"; 
import ContainerPDF from '../printPDF/printPDF';
import  {UploadImagesForm} from '../../Boletas';
// pruebas de poner todo en una carpeta para ahorrar lineas
import MapComponent from "./Mapa";
//cargando
import Loading from "../../../components/Loading.js";
import { BASE_URL } from '../../../api.js';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import Toast from "react-native-easy-toast";

import { styles } from "./AgregarBoletas.styles.js";
import StepIndicator from './StepIndicator'; 


const WidthScreen = Dimensions.get("window").width;
const heigthScreen = Dimensions.get("window").height;


export function AgregarBoletas({ route, navigation }) {
   const [data, setdata] = useState([]);
   const toastRef = useRef(null);
  /*   const {setIsLoading, navigation, userInfo} = props; */
    const { userInfo } = route.params;

    const [loading, setLoading] = useState(false);
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

    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [isVisibleSign, setIsVisibleSign] = useState(false);
    const [state, setState] = useState({currentStep:0,steps:['Captura', 'Motivos', 'Finalizacion']});
    const [locationRestaurant, setLocationRestaurant] = useState(null);
    const [clasificacionLista, setClasificacionLista] = React.useState('');
    const [idDenuncia, setIdDenuncia] = useState("");
    const [imagenes, setImagenes] = useState([]);

     useEffect(() => {
        navigation.setOptions({title: "Nueva boleta" });
        setdata(articulos);
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
  
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: '100%' }}>
        <Text style={styles.title} >{item.apartado}</Text>
        {item.answers.map((answer, answerIndex) => (
          <View style={styles.item} key={answerIndex}>
            <CheckBox
              size={40}
              checked={answer.checked}
              style={styles.ckItem}
              onPress={() => onChangeValue(answer, index)}
            />
            <View style={{ ...styles.WrapText, maxWidth: '80%' }}>
              <Text>{answer.right_ans}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };
 
  const addBoleta = async () => {
    setLoading(true);
    var formData = new FormData();
    formData.append('Nombres', userInfo.nombre);
    formData.append('Paterno', userInfo.apellidos);
    formData.append('Materno', userInfo.apellidos);
    formData.append('Referencias', restaurantAddress);
    formData.append('NoPermiso', restaurantDescription);
    formData.append('UbicacionLat', locationRestaurant.latitude);
    formData.append('UbicacionLon', locationRestaurant.longitude);
    formData.append('IdUsuarioMovil', userInfo.id);
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
    data.forEach(item => {
        item.answers.forEach(awns => {
            if (awns.checked === true) {
                myItems.push({ p: item.id, r: awns.options });
            }
        });
    });
    formData.append('listareglamento', JSON.stringify(myItems));

    const config = {
        headers: {
            "Content-Type": "multipart/form-data; charset=utf-8;"
        }
    };

      axios.post(BASE_URL + '/CrearReporteInspeccion.php', formData, config)
      .then(response => {
          if (response.data.success) {
              console.log(response.data);
              // Mostrar alerta de éxito
              uploadImageStorage(response.data.id, userInfo.id).then(responseimage => {
                  setLoading(false);
                  setState({...state,currentStep: currentStep + 1});
                  setIdDenuncia(response.data);
                  toastRef.current?.show("Imagenes subidas");
              }).catch(error => {
                  setLoading(false);
                  toastRef.current?.show(`Error al subir las fotos: ${error.message}, intentelo mas tarde`);
              });
              toastRef.current?.show("Reporte subido con éxito");
          } else {
              setLoading(false);
              toastRef.current?.show("Error al subir el reporte, intentelo mas tarde");
          }
      })
      .catch(error => {
          setLoading(false);
          toastRef.current?.show("Error al subir el reporte, intentelo mas tarde");
      });
};


const uploadImageStorage = async (IdFolio, IdUsuario) => {
  try {
      await Promise.all(
          imagenes.map(async (image) => {
              let filename = image.split('/').pop();
              let match = /\.(\w+)$/.exec(filename);
              let type = match ? `image/${match[1]}` : `image`;

              const formData = new FormData();
              formData.append('IdFolio', IdFolio);
              formData.append('IdUsuario', IdUsuario);
              formData.append('fileToUpload', { uri: image, name: filename, type });

              const response = await axios.post(BASE_URL + '/subirfotos.php', formData, {
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data',
                  },
              });

              console.log(response.data);

              if (response.data.success) {
                  console.log("Imagen subida con éxito:", response.data.message);
              } else {
                  console.error("Error al subir la imagen:", response.data.message);
                  throw new Error(response.data.message);
              }
          })
      );
  } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error; // Lanza el error para que el manejo de errores lo capture.
  }
};

  const nextPaso =  () => {

    if(!Infractor){
        toastRef.current?.show("Todos los campos del formularios son obligatorios");
    }else if(size(imagenes) === 0 ){
        toastRef.current?.show("El reporte tiene que tener al menos una foto");
    }else if(!locationRestaurant){
        toastRef.current?.show("Tienes que localizar el reporte en el mapa");
    }else{
      setState({...state,currentStep: currentStep + 1});
    } 
    
  };


  const handleImagesChange = (images) => {
    setImagenes(images);
  };

  
	const { steps, currentStep } = state;

    return (
    <View>
      <Toast ref={toastRef} position="center" opacity={0.9}/>
        <Modal animationType="slide" transparent={true} visible={isVisibleMap} onRequestClose={() => setIsVisibleMap(!isVisibleMap)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MapComponent
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
              />
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={isVisibleSign} onRequestClose={() => setIsVisibleSign(!isVisibleSign)} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Signature setIsVisibleSign={setIsVisibleSign} setbase64={setbase64} />
          </View>
        </View>
      </Modal>


				<View>
            <StepIndicator steps={steps} currentStep={currentStep} />  
            <View style={styles.separatorLine} />

              {currentStep == 0 &&    
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{height:heigthScreen}}>

                      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
                      <ScrollView horizontal={false} nestedScrollEnabled={true} contentContainerStyle={{paddingBottom:"50%"}}>
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
                      <UploadImagesForm onImagesChange={handleImagesChange}/>
                   
                      <Text style={styles.TextoReglamento}>
                      Para la notificación de la presente boleta de infraccion se designa inspector C.----QR---
                      Lo anterior con fundamentos en los Artículos 1, 2, 3, 8, 16 fracción VI, 25 fracción XXIV y 40 del Reglamento de la Administración Pública Municipal del Ayuntamiento de Tijuana, Baja California; a los Artículos 4 fracción III,5 y 27 fraccion II del Reglamento Interno de la Secretaria de Desarrollo Territorial, Urbano y Ambiental de Tijuana, Baja California; y los Articulos 7 fracciones III, X, XI, 46 y 49 del Reglamento de Limpia para Tijuana, Baja California.
                      </Text>

                      <ScrollView horizontal={true} style={{ flex: 1 }}>
                            <View style={{ maxWidth: '100%' }}>
                                <FlatList 
                                    nestedScrollEnabled={true}
                                    style={{ width: '100%' }}
                                    data={data}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </ScrollView>
                        <Button title="Paso 2" onPress={(nextPaso)} buttonStyle={styles.btnAddRestaurant}/>
                      </ScrollView>
                      </KeyboardAvoidingView>
                  </View>
              </View>
              }   
		          	 
              {currentStep == 1 &&	
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}  style={{marginBottom: '20%', marginTop:10 }}>
                    <Input 
                      placeholder="Infracción Cometida" 
                      inputContainerStyle={[styles.inputContainer]} 
                      inputStyle={styles.input}
                      onChange={(e) => setInfraccionCometida(e.nativeEvent.text)}
                     />
                   
                    <Input 
                      placeholder="Observaciones" 
                      multiline={true} 
                      inputContainerStyle={[styles.inputContainer, styles.textArea]} 
                      inputStyle={styles.input}
                      onChange={(e) => setObservaciones(e.nativeEvent.text)} 
                    />
                    <Text style={{ fontSize: 20 }}>Clasificación:</Text>
                    <View style={{ textAlign: 'center', justifyContent: 'space-between', padding: 15 }}>
                        <RadioButton.Group onValueChange={clasificacionLista => setClasificacionLista(clasificacionLista)} value={clasificacionLista}>
                            <RadioButton.Item label="Primera Fracción" value="Primera Fraccion" />
                            <RadioButton.Item label="Reincidencia" value="Reincidencia" />
                        </RadioButton.Group>
                    </View>
                    <Text style={styles.TextoReglamento}>
                        El inspeccionado infractor deberá presentarse en la Dirección de Servicios Públicos Municipales,
                        oficinas ubicadas en el primer nivel de palacio municipal, dentro de los 3 días hábiles siguientes a
                        aquel en que reciba la presente boleta de infracción, para que manifieste lo que a su derecho conviene,
                        mismo término que se otorga para que se acredite haber corregido o reparado el daño causado, pudiendo solicitar prórroga
                        a la dirección si la naturaleza del caso lo requiere
                    </Text>

                    <Text style={{ fontSize: 20 }}>Nombre y firma de quien lo recibe</Text>
                    <Button
                        title="Realizar Firma" containerStyle={styles.ViewMapBtnContainerCancel}
                        buttonStyle={{ backgroundColor: base64 ? "#09B806" : "#a60d0d" }}
                        onPress={() => setIsVisibleSign(true)}
                    />
                    <Text style={{ fontSize: 20 }}>ASEGÚRATE DE GUARDAR LA INFORMACIÓN</Text>
                    <Button
                        title="Guardar" containerStyle={styles.ViewMapBtnContainerCancel} buttonStyle={styles.viewMapBtnCancel}
                        onPress={addBoleta}
                    />
               </ScrollView>
              }
            
              {currentStep == 2 &&	
                <View style={{height: heigthScreen,  justifyContent: 'space-between', alignSelf: 'center',}}>
                  <ContainerPDF idDenuncia={idDenuncia}/>
                </View>
              }
				</View>
        <Loading isVisible={loading} text="INGRESANDO REGISTRO" />
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
      <Input 
        placeholder="Infractor" 
        inputContainerStyle={styles.inputContainer} 
        inputStyle={styles.input}
        onChange={(e) => setInfractor(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Nombre del comercio" 
        inputContainerStyle={styles.inputContainer} 
        inputStyle={styles.input}
        onChange={(e) => setNombreComercio(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Calle" 
        inputContainerStyle={styles.inputContainer} 
        inputStyle={styles.input}
        onChange={(e) => setCalle(e.nativeEvent.text)}
      />
      <Input 
        placeholder="No.Exterior" 
        inputContainerStyle={styles.inputContainer} 
        inputStyle={styles.input}
        onChange={(e) => setNoExterior(e.nativeEvent.text)}
      />
      <Input 
        placeholder="No.Interior" 
        inputContainerStyle={styles.inputContainer} 
        inputStyle={styles.input}
        onChange={(e) => setNoInterior(e.nativeEvent.text)}
      />

      <Text style={styles.instructionText}>Hacer clic para asignar ubicación</Text>
      <Icon
        type="material-community"
        name="google-maps"
        size={100}
        color={locationRestaurant ? "#00a680" : "#c2c2c2"}
        onPress={() => setIsVisibleMap(true)}
        containerStyle={styles.iconContainer} // Añadir estilo para centrar el icono
      />  
      <Input  
        placeholder="Referencias" 
        multiline={true} 
        inputContainerStyle={[styles.inputContainer, styles.textArea]} 
        inputStyle={styles.input}
        onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
      />
      
      <Input 
        placeholder="No.Permiso de Operacion" 
        multiline={true} 
        inputContainerStyle={[styles.inputContainer, styles.textArea]} 
        inputStyle={styles.input}
        onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
    )
}