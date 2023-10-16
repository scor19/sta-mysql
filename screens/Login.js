import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles/Styles';
import { FIREBASE_AUTH } from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../services/FormValidation';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  const auth = FIREBASE_AUTH;

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Especifica el resolver para la validación de los inputs
  });

  const onSubmit = (data) => {
    saveEmail(data);
    signIn(data);
  };

  const signIn = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      Alert.alert('Sign in failed: ', error.message);
    }
  };

  const saveEmail = async (data) => {
    try {
      await AsyncStorage.setItem('email', data.email);
      console.log('Email saved at login:', data.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={['#A9DFBF', 'white']}
      style={styles.containerClear}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 0.4 }}
    >
      <View style={[styles.containerClear, { justifyContent: 'center' }]}>
        <KeyboardAvoidingView behavior="padding">
          <Text
            style={[
              styles.textTitle,
              { textAlign: 'center', color: '#50bb52' },
            ]}
          >
            Welcome back
          </Text>
          <Text
            style={[
              styles.textTitleSub,
              { textAlign: 'center', marginBottom: 15 },
            ]}
          >
            We're happy to see you!
            {'\n'}
            Login to your account.
          </Text>
          <View>
            <Text style={styles.textPlaceholder}>Email</Text>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <View style={styles.inputSingle}>
                  <AntDesign
                    style={styles.iconLeft}
                    name="mail"
                    size={20}
                    color={'#50bb52'}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={styles.textError}>{errors.email.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.textPlaceholder}>Password</Text>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <View style={styles.inputSingle}>
                  <AntDesign
                    name="lock"
                    size={20}
                    color={'#50bb52'}
                    style={styles.iconLeft}
                  />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={showPassword ? true : false}
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <AntDesign
                      name="eye"
                      size={20}
                      color={'#50bb52'}
                      style={styles.iconRight}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.textError}>{errors.password.message}</Text>
            )}
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[
                styles.inputElevation,
                { backgroundColor: '#50bb52', padding: 10, borderRadius: 15 },
              ]}
            >
              <Text style={{ color: '#fff', alignSelf: 'center' }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[styles.textTitleSub, { color: 'gray' }]}>
              Don't have an account yet?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text
                style={[
                  styles.textTitleSub,
                  { color: '#50bb52', fontWeight: 'bold' },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

export default Login;
