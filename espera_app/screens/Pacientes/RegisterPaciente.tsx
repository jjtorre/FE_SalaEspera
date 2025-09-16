import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, Alert,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../components/customButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { registrarPaciente } from '../../services/PacienteService';
import { Picker } from '@react-native-picker/picker';



export default function RegisterPacienteScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [fecha_nacimiento, setFecha] = useState<Date>(new Date());;
  const [sintomas, setSintomas] = useState('');
const [urgencia, setUrgencia] = useState('');
  const [expediente, setExpediente] = useState('');
  const [ritmo_cardiaco, setRitmo_cardiaco] = useState('');
  const [oxigeno_sangre, setOxigeno_sangre] = useState('');
const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

  };

const handleSubmit = async () => {
  try {
    const nuevoPaciente = {
      nombre,
      fecha_nacimiento: fecha_nacimiento.toISOString().split('T')[0],
      sintomas,
      urgencia: parseInt(urgencia),
      expediente,
      ritmo_cardiaco: parseInt(ritmo_cardiaco),
      oxigeno_sangre: parseInt(oxigeno_sangre),
    };

    const result = await registrarPaciente(nuevoPaciente);
    Alert.alert('Éxito', result.mensaje);
  } catch (error) {
    let message = 'Ocurrió un error';
  if (error instanceof Error) {
    message = error.message;
  }
    Alert.alert('Error', message);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre *</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

<Text style={styles.label}>Fecha Nacimiento *</Text>

      <TouchableOpacity style={styles.input} onPress={() => setIsDatePickerOpen(true)}>
        <Text>{fecha_nacimiento.toLocaleDateString()}</Text>
      </TouchableOpacity>

     {isDatePickerOpen && (
  <DateTimePicker
    value={fecha_nacimiento}
    mode="date"
    display="default"
    maximumDate={new Date()}
    onChange={(event, selectedDate) => {
      setIsDatePickerOpen(false);
      if (selectedDate) setFecha(selectedDate);
    }}
  />
)}
      
      <Text style={styles.label}>Sintomas</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        multiline
        value={sintomas}
        onChangeText={setSintomas}
      />

        <Text style={styles.label}>Expediente</Text>
      <TextInput style={styles.input} value={expediente} onChangeText={setExpediente} />

      <Text style={styles.label}>Ritmo Cardiaco</Text>
      <TextInput
        style={styles.input}
        value={ritmo_cardiaco}
        onChangeText={setRitmo_cardiaco}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Oxígeno</Text>
      <TextInput
        style={styles.input}
        value={oxigeno_sangre}
        onChangeText={setOxigeno_sangre}
        keyboardType="numeric"
      />

       <Text style={styles.label}>Urgencia *</Text>
<View style={styles.pickerContainer}>
  <Picker
    selectedValue={urgencia}
    onValueChange={(itemValue) => setUrgencia(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Selecciona urgencia" value="" />
    <Picker.Item label="1 - Alta" value="1" />
    <Picker.Item label="2 - Media" value="2" />
    <Picker.Item label="3 - Baja" value="3" />
  </Picker>
</View>


      <CustomButton title="Agregar a la cola" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 4,
  marginTop: 4,
  marginBottom: 16,
},
picker: {
  height: 50,
  width: '100%',
},

});