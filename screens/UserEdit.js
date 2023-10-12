import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/Styles';
import db from '../database/firebase';
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { editSchema } from '../services/FormValidation';
import { AntDesign } from '@expo/vector-icons';

const UserEdit = ({ route }) => {
  const [patient, setPatient] = useState({
    accountEmail: '',
    name: '',
    email: '',
    phone: '',
    appointment: '',
    reason: '',
    record: '',
  });
  const { userId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPatientData = async () => {
      const patientRef = doc(db, 'patient', userId);

      try {
        const docSnapshot = await getDoc(patientRef);
        if (docSnapshot.exists()) {
          const patientData = docSnapshot.data();
          setPatient({
            id: docSnapshot.id,
            accountEmail: patientData.accountEmail,
            appointment: patientData.appointment,
            email: patientData.email,
            name: patientData.name,
            phone: patientData.phone,
            reason: patientData.reason,
            record: patientData.record,
          });
          reset({
            name: patientData.name,
            email: patientData.email,
            phone: patientData.phone,
            appointment: patientData.appointment,
            reason: patientData.reason,
            record: patientData.record,
          });
        } else {
          // El documento no existe
          console.log('El paciente no existe en la base de datos.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del paciente', error);
      }
    };
    fetchPatientData(); // Llama a la función asíncrona para cargar los datos
  }, [userId]);

  const handleGoBack = () => {
    console.log('Go back');
    navigation.goBack();
  };

  // Manejo de estados para la librería de fechas
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setDate] = useState('');

  // Define si se muestra el selector de fecha y hora
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Confirma la fecha y hora seleccionada, la envía a la función formatDate
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
    formState: { errors },
  } = useForm({
    defaultValues: patient,
    resolver: yupResolver(editSchema), // Especifica el resolver para la validación de los inputs
  });

  // Envía los datos a firestore
  const editPatient = async (dataToSubmit) => {
    console.log('Submitted data:', dataToSubmit);
    console.log('Update patient~');
    try {
      await updateDoc(doc(db, 'patient', patient.id), dataToSubmit);
      Alert.alert(
        'Patient updated succesfully',
        'The patient was updated in the database',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      setDate('');
    } catch (error) {
      console.error('Error saving the patient', error);
    }
  };

  // Revisa si se cambió la fecha y añade la fecha ya formatteada
  // Oculta el teclado cuando se presiona "save"
  const onSubmit = (data) => {
    console.log('onSubmit data:', data);
    dataToSubmit = {
      ...data,
      appointment: formattedDate,
      accountEmail: patient.accountEmail,
    };
    dataToSubmit.appointment
      ? ''
      : (dataToSubmit.appointment = patient.appointment);
    editPatient(dataToSubmit);
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={styles.textTitle}>Edit appointment</Text>
      <Text style={styles.textTitleSub}>Patient info</Text>
      <KeyboardAvoidingView behavior="padding">
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
                placeholder={patient.name}
                onChangeText={field.onChange}
                value={field.value}
                defaultValue=""
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
                placeholder={patient.email}
                onChangeText={field.onChange}
                value={field.value}
                defaultValue=""
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
                placeholder={patient.phone}
                onChangeText={field.onChange}
                value={field.value}
                defaultValue=""
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
                  {formattedDate ? formattedDate : patient.appointment}
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
                  defaultValue=""
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
                placeholder={patient.reason}
                onChangeText={field.onChange}
                value={field.value}
                defaultValue=""
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
                placeholder={patient.record}
                onChangeText={field.onChange}
                value={field.value}
                defaultValue=""
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
          type="submit"
          onPress={handleSubmit(onSubmit)}
          style={[
            styles.inputElevation,
            { backgroundColor: '#50bb52', padding: 10, borderRadius: 15 },
          ]}
        >
          <Text
            style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={handleGoBack}
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
            name="back"
            size={24}
            color="white"
            style={styles.iconLeft}
          />
          <Text
            style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}
          >
            Go back
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserEdit;
