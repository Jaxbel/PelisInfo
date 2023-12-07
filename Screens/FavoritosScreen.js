import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore_DB } from '../Settings/firebase-config';


const FavoritesScreen = ( {navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesRef = await getDocs(collection(Firestore_DB, 'FavMovies'))
        const fetchedFavorites = favoritesRef.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setFavorites(fetchedFavorites);
        console.log(fetchFavorites);
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);

  const viewDetail = (item) => {
    navigation.navigate('DetailScreen', { movie: item });
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity onPress={() => viewDetail(item)} style={styles.itemContainer}>
      <View>
        <Image style={styles.image} source={{ uri: item.Poster }} />
        <Text style={styles.title}>{item.Title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mis Favoritos</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22092C',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
  },
});

export default FavoritesScreen;