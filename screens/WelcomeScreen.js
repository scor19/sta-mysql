import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../styles/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '../database/firebase';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';

const WelcomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#A9DFBF', '#ADD8E6']}
        start={[0.1, 0.1]}
        style={styles.linearGradient}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            marginVertical: 50,
          }}
        >
          <BlurView intensity={100}>
            <View
              style={{
                width: 350,
                height: 370,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#000',
                padding: 10,
              }}
            >
              <Text style={[styles.textTitle, {color: '#000'}]}>Get started </Text>
              <Text style={[styles.textTitleSub, {color: '#000'}]}>
                This app is designed for you to have easy control over your
                patients' appointments.
                {'\n'}
                {'\n'}
                To add a patient use the slide menu on the left.
                {'\n'}
                {'\n'}
                You can also edit your appointments at any time. Just slide and
                press on "Turns".
              </Text>
              <View style={[styles.buttonGroup ,{ flexDirection: 'row' }]}>
        <TouchableOpacity
          onPress={() => FIREBASE_AUTH.signOut()}
          style={[
            styles.inputElevation,
            {
              backgroundColor: '#50bb52',
              padding: 10,
              borderRadius: 15,
              flexDirection: 'row',
            },
          ]}
        >
          <AntDesign
            name="logout"
            size={24}
            color="white"
            style={styles.iconLeft}
          />
          <Text
            style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
            </View>
          </BlurView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default WelcomeScreen;
