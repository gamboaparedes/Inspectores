import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Page from '../screens/Page';
import Index from '../screens/Index';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            initialRouteName='account'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#00a680",
                tabBarInactiveTintColor: "#646464",
                tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
                tabBarLabelStyle: { fontSize: 16 }, // Tamaño del texto
                tabBarStyle: { backgroundColor: '#FFFFFF', borderRadius: 20, height: 70, paddingVertical: 10 }, // Estilo de la barra inferior
                tabBarItemStyle: { borderRadius: 20 } // Estilo de cada ítem de la barra
              })}
             >
            <Tab.Screen 
                name='HOME' 
                component={Index}  
                options={{ tabBarLabel: 'Inicio' }}
            />
            <Tab.Screen 
                name='account' 
                component={Page}
                options={{ tabBarLabel: 'Cuenta' }}
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

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width: 0,
            height:10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default HomeNavigation;