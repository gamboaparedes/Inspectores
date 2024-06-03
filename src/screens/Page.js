import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            // Elimina los datos de usuario de AsyncStorage
            await AsyncStorage.removeItem('UserData');
            // Reinicia la pila de navegación y navega a la pantalla de inicio de sesión
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            // Manejar errores
        }
    };

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
                    Podrás reportar los lugares por medio de tu ubicación y capturar los datos para consultarlos.
                </Text>
                <Button
                    icon={
                        <Icon
                            name="logout"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    onPress={handleLogout}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="Cerrar Sesión"
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
});

export default Page;
