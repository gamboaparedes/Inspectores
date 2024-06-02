import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import LoginScreen from '../screens/Account/Login';

const Stack = createNativeStackNavigator();

const AppNavigation = ({ initialRoute }) => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={({ route }) => ({ headerTitle: 'Inicia sesion' })}
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeNavigation} 
                    options={({ route }) => ({ headerShown: false, headerTitle: getHeaderTitle(route) })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function getHeaderTitle(route) {
    // Obtén el nombre de la pantalla actual
    const routeName = route.state ? route.state.routes[route.state.index].name : 'HOME';
    // Mapea el nombre de la pantalla al título deseado
    switch (routeName) {
        case 'HOME':
            return 'Inicio';
        case 'account':
            return 'Cuenta';
        default:
            return 'Ordenes de Proteccion';
    }
}

export default AppNavigation;
