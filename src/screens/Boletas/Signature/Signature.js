import React, { useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

export default function Signature(props) {
  const ref = useRef();
  const { setIsVisibleSign, setbase64 } = props;

  const handleOK = (signature) => {
    setbase64(signature); 
    setIsVisibleSign(false); 
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setIsVisibleSign(false); 
    setbase64(null);
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  const style = `.m-signature-pad {box-shadow: none; border: none; } 
    .m-signature-pad--body {border: none;}
    .m-signature-pad--footer {display: none; margin: 0px;}
    body,html {
    width: 100%; height: 100%;}`;

  return (
    <View style={styles.container}>
      <SignatureScreen 
        ref={ref} 
        onOK={handleOK} 
        webStyle={style} 
        bgWidth="100%" 
        bgHeight="100%" 
        autoClear={false} // Añadir esta línea para evitar que se borre automáticamente
      />
      <View style={styles.row}>
        <Button title="Eliminar" color="#621132" onPress={handleClear} />
        <Button title="Guardar" color="#621132" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
});
