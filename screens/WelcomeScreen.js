import { View, Text, ScrollView, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles/Styles';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
  return (
    <LinearGradient
      colors={['#A9DFBF', '#ADD8E6']}
      start={[0.1, 0.1]}
      style={styles.linearGradient}
    >
        <View style={styles.containerClear}>
          <Text style={styles.textTitle}>Welcome to Simple Turn App </Text>
          <Text style={styles.textTitleSub}>
            This app is designed for you to have easy control over your
            patients' schedules.
            {'\n'}
            {'\n'}
            To add a patient to the list press the button below or use the slide
            menu at the left.
            {'\n'}
            {'\n'}
            Your scheduled patients are right below, you can press on them to
            see the details.
          </Text>
        </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;
