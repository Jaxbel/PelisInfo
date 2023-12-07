import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

// Crear un componente para la tarjeta de detalles de la película
const MovieDetailCard = ({ datos }) => {
    return (
      <View style={styles.card}>
        {datos.Poster === "N/A" ? (
          <Image
            style={styles.images}
            source={require('../assets/images/nophoto.png')}
          />
        ) : (
          <Image style={styles.images} source={{ uri: datos.Poster }} />
        )}
  
        <Text style={styles.texto}>{datos.Released}</Text>
        <Text style={styles.texto2}>{datos.Actors}</Text>
        <Text style={styles.texto2}>{datos.Plot}</Text>
        <Text style={styles.texto2}>{datos.Genre}</Text>
        <Text style={styles.texto2}>{datos.Production}</Text>
        <Text style={styles.texto2}>{datos.Awards}</Text>
      </View>
    );
  };
  
export default MovieDetailCard;

const Card = styled.View`
  align-items: center;
  margin-bottom: 20px;
  /* Estilos para la tarjeta */
`;