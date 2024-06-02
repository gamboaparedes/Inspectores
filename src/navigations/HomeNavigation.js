// HomeNavigation.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Page from '../screens/Page';
import InicioStack from "./InicioStack";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='account'
            tabBarOptions={{
                activeTintColor: "#00a680",
                inactiveTintColor: "#646464",
                labelStyle: { fontSize: 16 },
                style: { backgroundColor: '#FFFFFF', borderRadius: 20, height: 70, paddingVertical: 10 },
            }}
        >
            <Tab.Screen 
                name='HOME' 
                component={InicioStack}  
                options={{ tabBarLabel: 'Cuenta' }}
            />
            <Tab.Screen 
                name='account' 
                component={Page}
                options={{ title: 'Cuenta' }}
            />
        </Tab.Navigator>
    )
}

export default HomeNavigation;
