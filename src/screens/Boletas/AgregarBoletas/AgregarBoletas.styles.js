import {StyleSheet,Dimensions} from "react-native";

const heigthScreen = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    separatorLine: {
      width: '80%', // Ajusta el ancho de la línea según sea necesario
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginTop: 10, // Ajusta el margen superior según sea necesario
      alignSelf: 'center', // Centra horizontalmente la línea
    },
    
    titlePrincipal:{
        fontSize: 25,
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        backgroundColor : "#2089dc",
        color : "white",
        textAlign : "center",
        paddingVertical : 5,
        marginBottom : 10
    },
      TextoReglamento: {
          fontSize: 16,
          marginBottom: 10,
          textAlign: 'justify',
          padding: 10, // Añadir padding para que el texto no toque los bordes
          borderRadius: 15, // Borde circular
          borderWidth: 1, // Ancho del borde
          borderColor: '#000', // Color del borde (puedes cambiarlo)
          backgroundColor: '#ffffff', // Color de fondo blanco
          overflow: 'hidden', // Asegurarse de que el contenido no se salga del borde
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
      marginBottom: '20%',
    },

    //INPUTS DE GENERAR ORDEN
    inputContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    input: {
      borderBottomWidth: 0, // Remove bottom border
      fontSize: 16,
    },
    textArea:{
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
        height: 100,
    },
    inputContainerStyle: {
      borderBottomWidth: 0, // Remove bottom border
    },
    iconContainer: {
      alignSelf: 'center', // Centrar el icono horizontalmente
      marginBottom: 10, // Espacio entre el icono y el input
    },
    instructionText: {
      textAlign: 'center', // Centrar el texto horizontalmente
      fontSize: 16, // Tamaño de fuente ajustable
      marginBottom: 10, // Espacio entre el texto y el icono
    },


    btnAddRestaurant:{
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
    },
    modalView: {
      width: '90%',
      height: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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