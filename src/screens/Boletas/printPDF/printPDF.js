import * as React from 'react';
import { View, Text ,StyleSheet, Button , Dimensions} from 'react-native';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
//import * as OpenAnything from "react-native-openanything";
//import RNPrint from 'react-native-print';
//import FileViewer from "react-native-file-viewer";
import { shareAsync } from 'expo-sharing';
import { BASE_URL } from '../../../api';


  export default function PrintPDF(props){ 
  const { idDenuncia } = props;
    // Download the pdf file to expo temporary storage
    async function download2() {

    const fileUrl = BASE_URL+'/visorinspector.php?id='+idDenuncia.id;
    const fileName = `${Date.now()}.pdf`;

    FileSystem.downloadAsync(fileUrl, FileSystem.documentDirectory + fileName)
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
        saveFile(uri);
        
         shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  async function saveFile(filePath) {
    const albumName = 'auto print';
    const permission = await MediaLibrary.requestPermissionsAsync();

    let asset = null;
    if (permission.granted) {
      console.log('tiene permiso');
     /*  try {
        asset = await MediaLibrary.createAssetAsync(filePath);
      } catch (e) {
        console.error('MediaLibrary.createAssetAsync failed', e);
      } */

    /*   if (asset) {
        try {
          let album = await MediaLibrary.getAlbumAsync(albumName);
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          } else {
            album = await MediaLibrary.createAlbumAsync(
              albumName,
              asset,
              false
            );
          }
          const assetResult = await MediaLibrary.getAssetsAsync({
            first: 1,
            album,
            sortBy: MediaLibrary.SortBy.creationTime,
          });
          asset = await assetResult.assets[0];
        } catch (e) {
          console.error(' failed', e);
        }
      } else {
        console.error('unable to use MediaLibrary, can not create assets');
      } */
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Boleta Creada Correctamente.</Text>
      <Text style={styles.text}>Numero de Boleta: {idDenuncia.id}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Guardar y imprimir reporte" onPress={download2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinea los elementos en la parte superior del contenedor
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 100, // Añade un margen adicional
  },
  text: {
    marginBottom: 20, // Aumenta el espacio entre los textos y el botón
    fontSize: 20, // Aumenta el tamaño del texto
  },
  buttonContainer: {
    width: '80%', // Utiliza el 80% del ancho de la pantalla
  },
});