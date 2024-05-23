import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InicioAtencion from "../screens/Index";
import { AgregarBoletas, ListaBoletas } from '../screens/Boletas';

const Stack = createStackNavigator();

export default function TopRestaurantsStack(){

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="inicioatencion"
            component={InicioAtencion}
            options={{ title:"NAVEGACION",headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#012d4a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
            />

            <Stack.Screen 
            name="boletas-add"
            component={AgregarBoletas}
            options={{ title:"Nueva boleta",headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#012d4a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
            />

            <Stack.Screen 
            name="boletas-lista"
            component={ListaBoletas}
            options={{ title:"Nueva boleta",headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#012d4a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
            />

        </Stack.Navigator>

    );
}