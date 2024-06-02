import React from "react";
import { View, FlatList,ActivityIndicator} from 'react-native';
import { Text, ListItem, Icon } from '@rneui/themed';
import { styles } from "./Registros.styles";
import { size } from "lodash";
import Moment from 'moment';

export default function Registros(props) {
  const {dataSource,handleLoadMore, isLoading, navigation} = props;

  const goToEnvio = (idEnvio) => {
    navigation.navigate("boleta-vista", { idEnvio });
  }
  
  return (
        <View>
            {size(dataSource) > 0  ? (
                <FlatList 
                    data={dataSource} 
                    renderItem={(doc) => <Tramites remision={doc} navigation={navigation} goToEnvio={goToEnvio}/> }
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThresholh={0.5}
                    onEndReached={handleLoadMore}
                    contentContainerStyle={{paddingBottom:"30%"}}
                    ListFooterComponent={<FooterList isLoading={isLoading}/>}
                />
            ) : (
           <View style={styles.loaderRestaurants}>
               <ActivityIndicator size="large" />
                <Text>Cargando boletas</Text>
           </View>
            )}
        </View>
  )
}

function Tramites(props){
  const {remision, goToEnvio } = props;
  const {id, fecha } = remision.item;

  return (   
          <ListItem bottomDivider key={id} onPress={() => goToEnvio(id)}>
              <ListItem.Content>
              <ListItem.Title>No.boleta: {id}</ListItem.Title>
              <ListItem.Subtitle>Realizado: {Moment(fecha, "YYYY-MM-DD").format('D MMM YYYY')}</ListItem.Subtitle>
              </ListItem.Content>
              <Icon type="material-community" name="chevron-right" />
          </ListItem>
      )
  }

  
function FooterList(props){
  const { loading } = props
  //cuando baje el usuario salga un cargando
  if (loading) {
      return (
          <View style={styles.loaderRestaurants} >
              <ActivityIndicator size="large"/>
          </View>
      )
  }else{
      return (
          <View style={styles.notFoundRestaurants} >
              <Text>No quedan boletas por cargar</Text>
          </View>
      )
  }
}