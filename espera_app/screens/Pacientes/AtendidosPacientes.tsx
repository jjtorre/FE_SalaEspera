import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerPacientesAtendidosHoy } from '../../services/PacienteService';
import { Paciente } from './types';

interface PacientesAtendidosHoyProps {
  navigation: any;
}

export default function PacientesAtendidosHoy({ navigation }: PacientesAtendidosHoyProps) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPacientes = async () => {
        try {
          setLoading(true);
          const data = await obtenerPacientesAtendidosHoy();
          console.log('Pacientes atendidos hoy:', data);
          setPacientes(data);
        } catch (error) {
          console.error('Error al obtener pacientes atendidos:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPacientes();
      return () => {};
    }, [])
  );

  const getColor = (urgencia: number) => {
    if (urgencia === 1) return '#FF0000';
    if (urgencia === 2) return '#FFD600';
    return '#00C853';
  };

 const renderItem = ({ item }: { item: Paciente }) => (
    <View style={styles.item}>
      <View style={[styles.circle, { backgroundColor: getColor(item.urgencia) }]} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.sintomas}>{item.sintomas}</Text>
        <Text style={styles.detalle}>Fecha de Nacimiento: {item.fecha_nacimiento}</Text>
        <Text style={styles.detalle}>Expediente: {item.expediente}</Text>
        {item.ritmo_cardiaco && (
          <Text style={styles.detalle}>Ritmo Cardíaco: {item.ritmo_cardiaco} bpm</Text>
        )}
        {item.oxigeno_sangre && (
          <Text style={styles.detalle}>Oxígeno en Sangre: {item.oxigeno_sangre}%</Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text>Cargando pacientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pacientes Atendidos Hoy</Text>
      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes atendidos hoy</Text>
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  atendido: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPacientes: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  
  detalle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  }
});