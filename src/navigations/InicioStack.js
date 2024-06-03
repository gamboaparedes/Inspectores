// InicioStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InicioAtencion from "../screens/Index";
import { AgregarBoletas, ListaBoletas, VistaBoletas } from '../screens/Boletas';
import {LinearGradient} from 'expo-linear-gradient';


const Stack = createStackNavigator();

export default function InicioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="inicioatencion"
                component={InicioAtencion}
                options={{ 
                    title: "NAVEGACION",
                    headerBackTitleVisible: false,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#26a0fc', '#b5d3fe']} // Colores del degradado lineal
                            style={{ flex: 1 }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                    ),
                }}
            />
            <Stack.Screen 
                name="boletas-add"
                component={AgregarBoletas}
                options={{ title:"Nueva boleta",headerBackTitleVisible: false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerBackground: () => (
                    <LinearGradient
                        colors={['#26a0fc', '#b5d3fe']} // Colores del degradado lineal
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                ),
                }}
            />
            <Stack.Screen 
                name="boletas-lista"
                component={ListaBoletas}
                options={{ title:"Nueva boleta",headerBackTitleVisible: false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerBackground: () => (
                    <LinearGradient
                        colors={['#26a0fc', '#b5d3fe']} // Colores del degradado lineal
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                ),
                }}
            />
            <Stack.Screen 
                name="boleta-vista"
                component={VistaBoletas}
                options={{ 
                    title: "Informacion de boleta",
                    headerBackTitleVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}
