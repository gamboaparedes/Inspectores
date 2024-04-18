import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet,View , Text } from "react-native";
import { Icon } from '@rneui/themed';
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="login">
                <Tab.Screen 
                    name="login"
                    component={AccountStack}
                    options={{ title: "Perfil" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}


//<Tab.Screen name="restaurants" 
//component={RestaurantStack} 
//options={{ title: "Reportes" }}
///>


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

function screenOptions(route, color){
    let iconName;

    switch (route.name) {
        case "restaurants":
            iconName = "folder-outline"
            break;
         case "favorites":
            iconName = "heart-outline"
             break;
        case "inicio-atencion":
           iconName = "home-outline"
              break;
        case "search":
            iconName = "magnify"
               break;
        case "account":
            iconName = "account-outline"
                break;
        default:
            break;
    }

    return (
        <Icon type="material-community" name={iconName} size={50} color={color}  />
    );
}