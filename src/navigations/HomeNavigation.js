import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Page from '../screens/Page';
import InicioStack from "./InicioStack";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='account'
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarActiveTintColor: "#26a0fc",
                tabBarInactiveTintColor: "#646464",
                tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
                tabBarLabelStyle: { fontSize: 19 }, // Tamaño del texto
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 80,
                    height: 70,
                    paddingVertical: 10,
                    marginBottom: 10 
                }, 
                tabBarItemStyle: { borderRadius: 40 }, // Estilo de cada ítem de la barra
                headerTintColor: '#fff',
                headerBackground: () => (
                    <LinearGradient
                        colors={['#26a0fc', '#b5d3fe']}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                ),
            })}
        >
            <Tab.Screen
                name='HOME'
                component={InicioStack}
                options={{ headerShown: false, tabBarLabel: 'Cuenta' }}
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
        <Ionicons type="material-community" name={iconName} color={color} size={36} /> // Tamaño del icono
    ); 
}

export default HomeNavigation;
