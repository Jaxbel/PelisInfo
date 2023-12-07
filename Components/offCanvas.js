import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Offcanvas = ({ isVisible, onClose, navigation }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>Opción 1</Text>
      <Text>Opción 2</Text>
      <Text>Opción 3</Text>
      {/* Agrega más opciones según sea necesario */}
      <TouchableOpacity onPress={onClose}>
        <Text>Cerrar Offcanvas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F05941',
    width: '80%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    // Estilos adicionales según tus necesidades
  },
});

export default Offcanvas;
