import React, { useState,useEffect  } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text }  from '@rneui/themed';
import * as ImagePicker from "expo-image-picker";
/* import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; */
import { v4 as uuid } from "uuid";
import { map, filter,size } from "lodash";
import { styles } from "./UploadImagesForm.styles";

export function UploadImagesForm({ onImagesChange } ) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState([]);


  useEffect(() => {
    onImagesChange(imageSelected);
  }, [imageSelected, onImagesChange]);


  
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a la galería de imágenes.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

   /*  if (!result.canceled) {
      const newPhotoUri = result.assets[0].uri;
      setImageSelected([...imageSelected, newPhotoUri]);
    } */

    if (!result.cancelled) {
      const selectedImages = await Promise.all(
        result.assets?.map(async (image) => {
      /*     const mimeType = image.type; 
          const fileName = 'my_photo.jpg';  */
  
          setImageSelected([...imageSelected, image.uri]);
          /* return { uri: image.uri, mimeType, fileName }; */
        }) || []
      );
    /*   setImageSelected([...imageSelected, ...selectedImages]); */
    }

    };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a la cámara.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const newPhotoUri = result.assets[0].uri;
      setImageSelected([...imageSelected, newPhotoUri]);
    }
   

  };

  const openCameraAndGallery = () => {
    Alert.alert(
      'Seleccionar fuente de imagen',
      '¿Cómo desea seleccionar la imagen?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cámara',
          onPress: () => openCamera(),
        },
        {
          text: 'Galería',
          onPress: () => openGallery(),
        },
      ]
    );
  };
  
  const removeImage = (image) => {
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
  };



  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >

      {size(imageSelected) < 4 && (
                <Icon
                type="material-community"
                name="camera"
                color="#a7a7a7"
                containerStyle={styles.containerIcon}
                onPress={openCameraAndGallery}
              />
            )}

        {map(imageSelected.flat(), (imageOrder, index) => (
          <Avatar 
            key={index}
            style={styles.imageStyle}
            source={{ uri: imageOrder  }}
            onPress={() => removeImage(imageOrder)}
          />
        ))}
      </ScrollView>
    </>
  );
}