import React, {useState, useEffect} from "react";
import {View, ActivityIndicator} from "react-native";
import { SearchBar } from '@rneui/themed';
import axios from 'axios';
import { styles } from "./ListaBoletas.styles";
import Registros from "./Registros";
import { BASE_URL } from '../../../api';

export function ListaBoletas(props){

    const {navigation} = props;
    const [search, setSearch] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('Buscador', search);
    
                const response = await axios.post(
                    BASE_URL+'/consultarboletas.php',
                    formData,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
                        }
                    }
                );
                setDataSource(response.data.boletas || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [search]);
    
    const handleLoadMore = () => { }
    
    return (
        <View style={styles.viewBody}>
            <SearchBar 
                placeholder="Buscar numero de boleta.."
                onChangeText={(e) => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />
            {!dataSource ? (
            <View style={styles.loaderRestaurants} >
                <ActivityIndicator size="large"/>
            </View>
            ) : (
            <Registros dataSource={dataSource}  handleLoadMore={handleLoadMore} isLoading={isLoading} navigation={navigation}/>
            )}
        </View>
    )
}