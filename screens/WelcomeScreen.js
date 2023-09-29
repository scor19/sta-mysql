import { View, Text } from 'react-native';
import React from 'react';
import { styles } from '../styles/Styles';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Welcome</Text>
    </View>
  );
};

export default WelcomeScreen;
