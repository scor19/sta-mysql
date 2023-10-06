import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../styles/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '../database/firebase';

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
          This app is designed for you to have easy control over your patients'
          schedules.
          {'\n'}
          {'\n'}
          To add a patient to the list press the button below or use the slide
          menu at the left.
          {'\n'}
          {'\n'}
          Your scheduled patients are right below, you can press on them to see
          the details.
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => FIREBASE_AUTH.signOut()}
            style={[
              styles.inputElevation,
              { backgroundColor: '#50bb52', padding: 10, borderRadius: 15 },
            ]}
          >
            <Text style={{ color: '#fff', alignSelf: 'center' }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;
