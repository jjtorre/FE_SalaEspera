import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import CustomButton from '../components/customButton';
import { obtenerListaEspera } from '../services/PacienteService';


  type Paciente = {
  id:string,
  nombre: string;
  fecha_nacimiento: Date;
  sintomas: string;
  urgencia: number;
  expediente: string;
  ritmo_cardiaco: number;
  oxigeno_sangre: number;
};

export default function Home({ navigation, route }: any) {

  const { email } = route.params;

  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const [loading, setLoading] = useState(true);
const [selectedId, setSelectedId] = useState<string | null>(null);

 useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await obtenerListaEspera();
        setPacientes(data);
      } catch (error) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    };
    fetchPacientes();
  }, []);

  const getColor = (urgencia:number) => {
    if (urgencia === 1) return '#FF0000'; // rojo
    if (urgencia === 2) return '#FFD600'; // amarillo
    return '#00C853'; // verde
  };

  const renderItem = ( { item }: { item: Paciente }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedId(selectedId === item.id ? null : item.id)}
    >
      <View style={[styles.circle, { backgroundColor: getColor(item.urgencia) }]} />
      {selectedId === item.id && (
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.sintomas}>{item.sintomas}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#333" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido, {email}</Text>
      <CustomButton
        title="Agregar a sala de Espera"
        onPress={() => navigation.navigate('RegisterPaciente')}
      /> 

      <FlatList
      data={pacientes}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    /></View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  sintomas: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },container: {
  flex: 1,
  backgroundColor: '#fff',
  paddingTop: 40,
},
header: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
  textAlign: 'center',
},

});