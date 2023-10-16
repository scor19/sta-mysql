import { View, Text, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '../database/firebase';
import Collapsible from 'react-native-collapsible';

const Patient = ({ id, appointment, email, name, phone, reason, record }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

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
        styles.elevation,
        styles.patientList,
        { flex: 1, marginHorizontal: 20 },
      ]}
    >
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View
          style={[
            styles.elevation,
            {
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.patientName]}>{name}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <AntDesign
              name="clockcircleo"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.patientName]}>{appointment}</Text>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          {expanded ? null : <Text>Press to see details</Text>}
          <Collapsible collapsed={!expanded}>
            <Text>{email}</Text>
            <Text>{phone}</Text>
            <Text style={styles.patientReason}>{reason}</Text>
            <Text>{record}</Text>
          </Collapsible>
        </View>
        <View style={{ flexDirection: 'row-reverse' }}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Delete', 'Are you sure?', [
                { text: 'OK', onPress: () => handleDelete() },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                },
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
            <AntDesign
              name="edit"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Patient;
