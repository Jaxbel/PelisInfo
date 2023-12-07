import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const DetailScreen = ({ route }) => {
  const { movie } = route.params;
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const apikey = "f9a5ecda";
    const api_url = `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=${apikey}`;
    fetch(api_url)
      .then((data) => {
        return data.json();
      })
      .then((resultado) => {
        setDatos(resultado);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {datos ? (
          datos.Poster !== "N/A" ? (
            <Image style={styles.images} source={{ uri: datos.Poster }} />
          ) : (
            <Image
              style={styles.images}
              source={require('../assets/images/nophoto.png')}
            />
          )
        ) : (
          <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
        )}

        <Text style={styles.text}>{datos?.Released}</Text>
        <Text style={styles.text}>{datos?.Actors}</Text>
        <Text style={styles.text}>{datos?.Plot}</Text>
        <Text style={styles.text}>{datos?.Genre}</Text>
        <Text style={styles.text}>{datos?.Production}</Text>
        <Text style={styles.text}>{datos?.Awards}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22092C',
    padding: 20,
  },
  images: {
    width: 200,
    height: 300,
    marginVertical: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 10,
  },
  loader: {
    marginTop: 50,
  },
});

export default DetailScreen;
