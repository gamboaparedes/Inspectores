import React from "react";
import { StyleSheet, View, Text, ActivityIndicator} from "react-native";
import { Overlay} from '@rneui/themed';

export default function Lading(props){
    const { isVisible, text } = props;
return (
    <Overlay 
    isVisible={isVisible}
    windowBackgroundColor="rgba(0, 0, 0, 0.5)"
    overlayBackgroundColor="transparent"
    overlayStyle = {styles.overlay}
    >
        <View style={styles.view}>
            <ActivityIndicator size="large" color="#670D24" />
             {text && <Text style={styles.text}>{text}</Text>}
        </View>
    </Overlay>
);
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#670D24",
        borderWidth: 2,
        borderRadius: 10,
    },
    view:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color: "#670D24",
        textTransform: "uppercase",
        marginTop: 10,
    }

});