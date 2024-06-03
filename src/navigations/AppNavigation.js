import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import LoginScreen from '../screens/Account/Login';

const Stack = createNativeStackNavigator();

const AppNavigation = ({ isLoggedIn }) => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerTitle: 'Inicia sesion', headerShown: false }}
                />
                {/* Modificamos la siguiente pantalla Home para que no muestre su pestaña */}
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
    const routeName = route.state ? route.state.routes[route.state.index].name : 'HOME';
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
