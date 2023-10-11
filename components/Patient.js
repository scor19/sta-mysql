import { View, Text, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '../database/firebase';

const Patient = ({ id, appointment, email, name, phone, reason, record }) => {
  const navigation = useNavigation();

  const handleDelete = async () => {
    console.log('Handle delete');
    try {
      await deleteDoc(doc(db, 'patient', id));
      Alert.alert('Deleted', 'The appointment was deleted');
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to delete: ', error.message);
    }
  };
  const handleEditPress = () => {
    // Navega a la pantalla de edición
    navigation.navigate('UserEdit', { userId: id });
  };

  return (
    <View
      style={[
        styles.inputElevation,
        styles.patientList,
        { flex: 1, marginHorizontal: 10 },
      ]}
    >
      <View
        style={[
          styles.inputElevation,
          {
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}
      >
        {/* <Text>Id: {id}</Text> */}
        <Text
          style={[
            styles.patientName,
            {
              elevation: 3,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 10,
            },
          ]}
        >
          {name}
        </Text>
        <Text
          style={[
            styles.patientName,
            {
              elevation: 3,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 10,
            },
          ]}
        >
          {appointment}
        </Text>
      </View>
      <Text>{email}</Text>
      <Text>{phone}</Text>
      <Text style={styles.patientReason}>{reason}</Text>
      <Text>{record}</Text>
      <View style={{ flexDirection: 'row-reverse' }}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Delete', 'Are you sure?', [
              { text: 'OK', onPress: () => handleDelete() },
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            ])
          }
        >
          <AntDesign
            name="delete"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditPress}>
          <AntDesign name="edit" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Patient;
