import { useNavigation } from "@react-navigation/native"
import React from 'react';
import {StyleSheet, View, RefreshControl, TouchableOpacity} from 'react-native';
import { Text, Card, Button, Icon, Image } from '@rneui/themed';

const Page = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>

<Card>
          <Card.Title>Bienvenido a la App de Inspectores</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            Podras reportar los lugares por medio de tu ubicacion e capturar los datos y consultarlos
          </Text>
          <Button
            icon={
              <Icon
                name="logout"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Cerrar Sesion"
          />
        </Card>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardContainer: {
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 100
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: 20,
    },
});

export default Page;
