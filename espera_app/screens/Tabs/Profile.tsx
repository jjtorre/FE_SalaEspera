import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import UserAvatar from '../../components/UserAvatar';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';

type Props = {
  email: string;
  name: string;
};

type CardItem = {
  id: string;
  title: string;
  description: string;
};

const sampleCards: CardItem[] = [
  { id: '1', title: 'Tarjeta 1', description: 'Descripción de la tarjeta 1' },
  { id: '2', title: 'Tarjeta 2', description: 'Descripción de la tarjeta 2' },
  { id: '3', title: 'Tarjeta 3', description: 'Descripción de la tarjeta 3' },
];

export default function Profile({ email, name }: Props) {
  const [nombre, setNombre] = useState(name);
  const [correo, setCorreo] = useState(email);
  const [telefono, setTelefono] = useState('');

  const handleGuardar = () => {
    console.log('Datos actualizados:', { nombre, correo, telefono });
  };

  return (
    <View style={styles.container}>
      <UserAvatar name={nombre} />

      <View style={styles.form}>
        <CustomInput label="Nombre" value={nombre} onChange={setNombre} type="text" />
        <CustomInput label="Correo" value={correo} onChange={setCorreo} type="email" />
        <CustomInput label="Teléfono" value={telefono} onChange={setTelefono} type="number" />
        <CustomButton title="Guardar Cambios" onPress={handleGuardar} variant="primary" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  form: { marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  cardList: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  cardBody: { fontSize: 14, color: '#555' },
});