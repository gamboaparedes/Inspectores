import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from "react-native-elements";
import { size } from "lodash";
import {useNavigation } from "@react-navigation/native";

export default function ListRestaurants(props) {
    const { restaurants, handleLoadMore, isLoading } = props;

    //pasamos la navegacion para poder dar click en un restaurante y abrir su informacion
    const navigation = useNavigation();

    return (
        <View>
            {size(restaurants) > 0  ? (
                <FlatList 
                    data={restaurants} 
                    renderItem={(restaurant) => <Restaurant restaurant={restaurant} navigation={navigation} /> }
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThresholh={0.5}
                    onEndReached={handleLoadMore}
                    contentContainerStyle={{paddingBottom:"30%"}}
                    ListFooterComponent={<FooterList isLoading={isLoading}/>}
                />
            ) : (
           <View style={styles.loaderRestaurants}>
               <ActivityIndicator size="large" />
                <Text>Cargando reportes</Text>
           </View>
            )}
        </View>
    );
}

function Restaurant(props){
    const { restaurant,navigation } = props;
    const { idSolicitud, Comercio, Infractor, Url } = restaurant.item;
    const ImageRestaurant = Url;


    const goRestaurants = () => {
        //navigation.navigate("restaurant", { idSolicitud,TipoServicio });
    };

    return (
        <TouchableOpacity onPress={goRestaurants}  >
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image resizeMode="cover" 
                    PlaceholderContent={<ActivityIndicator color="fff"/>}
                    source={
                        ImageRestaurant 
                        ?
                        {uri:ImageRestaurant } : require("../../../assets/img/no-image.png")
                    }
                    style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{idSolicitud}</Text>
                    <Text style={styles.restaurantAddress}>{Comercio}</Text>
                    <Text style={styles.restaurantDescription}>{Infractor.substr(0,60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
function FooterList(props){
    //cuando baje el usuario salga un cargando
    const { isLoading} = props;

    if (isLoading) {
        return (
            <View style={styles.loaderRestaurants} >
                <ActivityIndicator size="large"/>
            </View>
        )
    }else{
        return (
            <View style={styles.notFoundRestaurants} >
                <Text>No quedan reportes por cargar</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
loaderRestaurants:{
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center"
},
viewRestaurant:{
    flexDirection: "row",
    margin: 10
},
viewRestaurantImage:{
    marginRight: 15
},
imageRestaurant:{
    width: 80,
    height: 80
},
restaurantName:{
    fontWeight: "bold"
},
restaurantAddress:{
    paddingTop: 2,
    color: "grey"
},
restaurantDescription:{
    paddingTop: 2,
    color: "grey",
    width: 300
},
notFoundRestaurants:{
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
}
});