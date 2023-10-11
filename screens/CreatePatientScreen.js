import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, reset } from 'react-hook-form';
import db from '../database/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { patientSchema } from '../services/FormValidation';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePatientScreen = () => {
  // Manejo de estados para la librería de fechas
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setDate] = useState('');
  const [storageEmail, setStorageEmail] = useState('');

  // Define si se muestra el selector de fecha y hora
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Confirma la fecha y hora seleccionada, envía el warn para debuggear
  const handleConfirm = (date) => {
    console.log('Raw time: ', date);
    formatDate(date);
    hideDatePicker();
  };

  // Formato a la selección de fecha seleccionada para mostrarla en la screen
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (minute < 10) {
      minute = `0${minute}`;
    } else {
      minute = `${minute}`;
    }

    if (hour < 10) {
      hour = `0${hour}`;
    } else {
      hour = `${hour}`;
    }

    setDate(`${year}-${month}-${day} ${hour}:${minute}`);

    console.log(`Formated time: ${day}-${month}-${year} at ${hour}:${minute}`);
    return `${day}-${month}-${year}`;
  };

  // Define el hook de formularios de react
  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(patientSchema), // Especifica el resolver para la validación de los inputs
  });

  // Envía los datos a firestore
  const saveNewPatient = async (dataToSubmit) => {
    console.log(dataToSubmit);
    try {
      await addDoc(collection(db, 'patient'), dataToSubmit);
      Alert.alert(
        'Patient added succesfully',
        'The patient was saved in the database',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      setDate('');
    } catch (error) {
      console.error('Error saving the patient', error);
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        console.log('Storage email:', email);
        setStorageEmail(email);
      } catch (error) {
        console.log(error);
      }
    };
    getEmail();
  }, []);

  const onSubmit = (data) => {
    dataToSubmit = {
      ...data,
      appointment: formattedDate,
      accountEmail: storageEmail,
    };
    saveNewPatient(dataToSubmit);
    Keyboard.dismiss();
  };

  // Resetea el formulario una vez que se envió.
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        email: '',
        phone: '',
        appointment: new Date(),
        reason: '',
        record: '',
      });
    }
  }),
    [formState, reset];

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <KeyboardAvoidingView behavior="padding">
        <Text
          style={[styles.textTitle, { alignSelf: 'center', marginBottom: 20 }]}
        >
          Patient
        </Text>
        <Text style={styles.textTitleSub}>Patient info</Text>
        <View>
          <Text style={styles.textPlaceholder}>Name</Text>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <View style={styles.inputSingle}>
                <AntDesign name="right" size={20} color={'#50bb52'} />
                <TextInput
                  placeholder="Federico Pereyra"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </View>
            )}
          />
          {errors.name && (
            <Text style={styles.textError}>{errors.name.message}</Text>
          )}
        </View>
        <View>
          <Text style={styles.textPlaceholder}>Email (optional)</Text>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <View style={styles.inputSingle}>
                <AntDesign name="right" size={20} color="#50bb52" />
                <TextInput
                  placeholder="fedepereyra@example.com"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </View>
            )}
          />
          {errors.email && (
            <Text style={styles.textError}>{errors.email.message}</Text>
          )}
        </View>
        <View>
          <Text style={styles.textPlaceholder}>Phone number</Text>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <View style={styles.inputSingle}>
                <AntDesign name="right" size={20} color="#50bb52" />
                <TextInput
                  placeholder="1133401958"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </View>
            )}
          />
          {errors.phone && (
            <Text style={styles.textError}>{errors.phone.message}</Text>
          )}
        </View>
        <View>
          <Text style={styles.textPlaceholder}>Appointment date</Text>
          <Controller
            name="appointment"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <View style={[styles.inputSingle, { paddingVertical: 10 }]}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', width: '100%' }}
                  onPress={showDatePicker}
                >
                  <AntDesign
                    name="calendar"
                    size={20}
                    color="#50bb52"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: '#A9A9A9' }}>
                    {formattedDate ? formattedDate : 'Select date'}
                  </Text>
                  <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    minimumDate={new Date()}
                    selected={field.value}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.appointment && (
            <Text style={styles.textError}>{errors.appointment.message}</Text>
          )}
        </View>
        <View>
          <Text style={styles.textPlaceholder}>Appointment reason</Text>
          <Controller
            name="reason"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <View style={styles.inputSingle}>
                <AntDesign name="right" size={20} color="#50bb52" />
                <TextInput
                  placeholder="Medical check-up"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </View>
            )}
          />
          {errors.reason && (
            <Text style={styles.textError}>{errors.reason.message}</Text>
          )}
        </View>
        <View>
          <Text style={styles.textPlaceholder}>Record (optional)</Text>
          <Controller
            name="record"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <View style={styles.inputSingle}>
                <AntDesign name="right" size={20} color="#50bb52" />
                <TextInput
                  placeholder="Celiac, low blood presure..."
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </View>
            )}
          />
          {errors.record && (
            <Text style={styles.textError}>{errors.record.message}</Text>
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
            <Text
              style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreatePatientScreen;
