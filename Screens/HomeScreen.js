import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Constants from 'expo-constants';
import { Firebase_Auth } from '../Settings/firebase-config';
import { Firestore_DB } from '../Settings/firebase-config';
import { setDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const [lista, setLista] = useState([]);
  const [pelicula, setPelicula] = useState('');
  const [total, setTotal] = useState(0);
  const [consultado, setConsultado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favoritos, setFavoritos] = useState({});

  const buscar = (peli) => {
    setConsultado(true);
    setLoading(true);

    const apikey = 'f9a5ecda';
    const api_url = `http://www.omdbapi.com/?s=${peli}&apikey=${apikey}`;

    fetch(api_url)
      .then((data) => data.json())
      .then((resultado) => {
        const { Search = [] } = resultado;

        setLista(Search);
        setTotal(Search.length);
        setLoading(false);
      });
  };

  const addToFavorites =  (movie) => {
    /* setFavoritos({movie});
    console.log(movie);
    console.log(favoritos); */
    //const Data = favoritos.map( p => ({ }))
    if(movie.imdbID){
        setDoc(doc(Firestore_DB, "FavMovies/", movie.imdbID), 
          {Title: movie.Title, 
          Year: movie.Year, 
          imdbID: movie.imdbID, 
          Type: movie.Type, 
          Poster: movie.Poster
        })
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', { movie: item })}
    >
      <View>
        {
          item.Poster === 'N/A' ?
            <Image
              style={styles.images}
              source={require('../assets/images/nophoto.png')}
            />
            :
            <View>
              <Image
                style={styles.images}
                source={{ uri: item.Poster }}
              />
              <TouchableOpacity style={styles.buttonFavoritos} >
                <Text style={styles.buttonFav}>Agregar a favoritos</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    </TouchableOpacity>
  );

    const handleLogout = async ()=> {
        await signOut(Firebase_Auth);
    }
    return (
        <View style={styles.container}>
    
          <Text style={styles.texto}> Buscador de películas</Text>
    
          <SearchBar
             round
             containerStyle={{
                 backgroundColor:'transparent',
                 borderTopWidth:0,
                 borderBottomWidth:0,
             }}
             inputStyle={{backgroundColor:'white'}}
             onChangeText={(texto)=>{
                 setPelicula(texto);
                 buscar(texto);
             }}
             onClear={()=>{
                 setPelicula("");
                 setConsultado(false);
                 setLista([])
             }}
             value={pelicula}
             placeholder="Escribe aqui..."
          />
    
          <View style={styles.resultados}>
            {consultado ? (
              <Text style={styles.texto}>Hay {total} resultados</Text>
            ) : (
              <Text style={styles.texto}>Realiza una búsqueda</Text>
            )}
          </View>
    
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" style={styles.indicador} />
          ) : (
            <FlatList
                contentContainerStyle={{alignItems:"center"}}
                data={lista}
                numColumns={3}
                keyExtractor={item=> item.imdbID}
                renderItem={renderItem}
            />
          )}
        </View>
      );
    };
    
 
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      justifyContent: 'flex-start',
      backgroundColor: '#22092C',
    },
    images:{
      width: 100, 
      height: 150,
      margin:5,
    },
    texto:{
      color: 'white', 
      textAlign: 'center', 
      fontSize: 20,
      margin: 10,
      fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },

      resultados: {
        margin: 10,
        fontSize: 20,
      },
      indicador: {
        marginTop: 20,
      },
      Text: { 
        color: 'white',
        fontSize: 20,
      },
      buttonFav: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      buttonFavoritos: {
        backgroundColor: '#BE3144',
        height: 40,
        width: 100,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 5,
      },

});
  