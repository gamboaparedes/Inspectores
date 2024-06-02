// InicioStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InicioAtencion from "../screens/Index";
import { AgregarBoletas, ListaBoletas, VistaBoletas } from '../screens/Boletas';

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
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="boletas-add"
                component={AgregarBoletas}
                options={{ 
                    title: "Nueva boleta",
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen 
                name="boletas-lista"
                component={ListaBoletas}
                options={{ 
                    title: "Lista de boletas",
                    headerBackTitleVisible: false,
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
