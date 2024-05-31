import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from '@rneui/themed';
import * as Location from 'expo-location';

const WidthScreen = Dimensions.get("window").width;
const heigthScreen = Dimensions.get("window").height;

const MapComponent = ({ isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef }) => {
  const [location, setLocation] = useState({
    latitude: 32.4880534,
    longitude: -117.0233362,
    latitudeDelta: 0.24,
    longitudeDelta: 0.24,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        toastRef.current.show({
          type: 'info',
          position: 'bottom',
          text1: 'Tienes que ir a ajustes de la app y activar la localización',
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
    toastRef.current.show('Localización guardada correctamente');
    setIsVisibleMap(!isVisibleMap);
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.mapStyle}
          initialRegion={location}
          showsUserLocation={true}
          onRegionChange={(region) => setLocation(region)}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            draggable
          />
        </MapView>
      )}
      <View style={styles.buttonsContainer}>
        <Button title="Guardar Ubicación" onPress={confirmLocation} />
        <Button
          title="Cancelar Ubicación"
          buttonStyle={styles.cancelButton}
          onPress={() => setIsVisibleMap(!isVisibleMap)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mapStyle: {
    flex: 1,
    width: '100%',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: "#a60d0d",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default MapComponent;
