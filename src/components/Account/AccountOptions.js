import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
export default function AccountOptions(props) {
  const { userInfo, toastRef , setReloadUserInfo} = props;
  const [showModal, setshowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  //console.log(userInfo);

  
  return (
    <View>
      <Text>hola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
