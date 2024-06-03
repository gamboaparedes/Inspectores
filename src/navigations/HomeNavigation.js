import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Page from '../screens/Page';
import InicioStack from "./InicioStack";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (

        <Tab.Navigator
        initialRouteName='account'
        screenOptions={({ route }) => ({
            headerShown: true,
            tabBarActiveTintColor: "#00a680",
            tabBarInactiveTintColor: "#646464",
            tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
            tabBarLabelStyle: { fontSize: 16 }, // Tamaño del texto
            tabBarStyle: { backgroundColor: '#FFFFFF', borderRadius: 20, height: 70, paddingVertical: 10 }, // Estilo de la barra inferior
            tabBarItemStyle: { borderRadius: 40 }, // Estilo de cada ítem de la barra
            headerStyle: {
                backgroundColor: '#012d4a',
            },
            headerTintColor: '#fff',
          })}
         >
            <Tab.Screen 
                name='HOME' 
                component={InicioStack}  
                options={({ route }) => ({ headerShown: false, tabBarLabel: 'Cuenta' })}
            />
            <Tab.Screen 
                name='account' 
                component={Page}
                options={{ title: 'Cuenta' }}
            />
        </Tab.Navigator>
    )
}

function screenOptions(route, color, size) {
    let iconName;
    if (route.name === 'HOME') {
        iconName = "home";
    }
    if (route.name === 'account') {
        iconName = "settings";
    }
    return (
        <Ionicons  type="material-community" name={iconName} color={color} size={36} /> // Tamaño del icono
    ); 
}

export default HomeNavigation;
