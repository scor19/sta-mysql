import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../styles/Styles';

const Patient = ({ id, name, phone, reason, record }) => {
  return (
    <View style={[styles.inputElevation, styles.patientList]}>
      {/* <Text>Id: {id}</Text> */}
      <Text style={styles.patientName}>{name}</Text>
      <Text>{phone}</Text>
      <Text style={styles.patientReason}>{reason}</Text>
      <Text>{record}</Text>
    </View>
  );
};

export default Patient;
