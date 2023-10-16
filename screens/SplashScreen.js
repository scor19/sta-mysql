import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/Styles';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simula una carga de datos o tareas iniciales durante la pantalla de presentación.
    setTimeout(() => {
      // Navega a la pantalla principal o a la siguiente pantalla después de 2 segundos.
      navigation.replace('Login'); // Reemplaza 'Home' con el nombre de tu pantalla principal.
    }, 2000); // Cambia el tiempo (en milisegundos) según tus necesidades.
  }, []);

  return (
    <View>
      <Image
        source={require('../assets/STA_logo.svg')} // Cambia la ruta según la ubicación de tu logo.
      />
    </View>
  );
};

export default SplashScreen;
