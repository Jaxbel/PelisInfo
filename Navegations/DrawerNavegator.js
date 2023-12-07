import React, {useEffect} from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import FavoritosScreen from '../Screens/FavoritosScreen';
import StackNavigator1 from './StackNavegator';
import { Firebase_Auth } from '../Settings/firebase-config';
import { signOut } from 'firebase/auth';

const Drawer = createDrawerNavigator();


const LogoutScreen = () => {
  useEffect(() => {
    const handleLogout = async () => {
      await signOut(Firebase_Auth);
    };

    handleLogout(); // Llama a handleLogout al cargar la pantalla
  }, []);

  return (
    <View>
    </View>
  );
};


export default function DrawerNavigator1() {
  

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={StackNavigator1} />
        <Drawer.Screen name="Mis Favoritos" component={props => <FavoritosScreen {...props}/>} />
        <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
      />
        {/* Otros Screen dentro del Drawer Navigator */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
