import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

const StepIndicator = ({ steps, currentStep }) => {
  const windowWidth = useWindowDimensions().width;

  // Calculamos el tamaño del margen basado en el ancho de la pantalla
  const marginSize = windowWidth * 0.01; // Ajusta este valor según sea necesario

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.circleContainer}>
            <View style={[
              styles.circle,
              { backgroundColor: index <= currentStep ? '#26a0fc' : '#e0e0e0' }
            ]}>
              <Text style={styles.circleText}>{index + 1}</Text>
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.line,
                { backgroundColor: index < currentStep ? '#26a0fc' : '#e0e0e0' }
              ]} />
            )}
          </View>
          <Text style={[
            styles.stepText,
            { color: index <= currentStep ? '#26a0fc' : '#646464' }
          ]}>{step}</Text>
        </View>
      ))}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Ajusta el espaciado horizontal aquí
    alignItems: 'center', // Centra verticalmente los elementos
    marginVertical: 20,
  },
  stepContainer: {
    alignItems: 'center',
    flexDirection: 'column', // Cambia a columna para que el texto esté debajo del círculo
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Ajusta el margen horizontal según sea necesario
  },
  line: {
    height: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  circleText: {
    color: '#fff',
    fontSize: 16,
  },
  stepText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    width: '100%', // Asegura que el texto ocupe todo el ancho disponible
  },

});

export default StepIndicator;
