import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomButton from '../components/customButton';
import { obtenerListaEspera, atenderPaciente, actualizarUrgencia } from '../services/PacienteService';
import { Paciente } from './Pacientes/types';
import { Picker } from '@react-native-picker/picker';

interface HomeProps {
  navigation: any;
  route: any;
}

export default function Home({ navigation, route }: HomeProps) {
  const { email = 'Usuario', refresh = false } = route.params || {};
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedUrgencia, setSelectedUrgencia] = useState<number | null>(null);
  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const data = await obtenerListaEspera();
      console.log('Datos obtenidos:', data);
      setPacientes(data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPacientes();
      return () => {};
    }, [])
  );

  // Escuchar cambios en route.params.refresh para forzar recarga
  useEffect(() => {
    if (refresh) {
      fetchPacientes();
      // Limpiar el parámetro refresh para evitar recargas innecesarias
      navigation.setParams({ refresh: false });
    }
  }, [refresh, navigation]);

  const handleAtenderPaciente = async (pacienteId: string) => {
    try {
      await atenderPaciente(pacienteId);
      console.log(`Paciente ${pacienteId} marcado como atendido`);
      // Forzar recarga inmediata después de atender
      fetchPacientes();
    } catch (error) {
      console.error('Error al atender paciente:', error);
    }
  };
const handleCambiarUrgencia = async (pacienteId: string, nuevaUrgencia: number) => {
    try {
      await actualizarUrgencia(pacienteId, nuevaUrgencia);
      console.log(`Urgencia del paciente ${pacienteId} actualizada a ${nuevaUrgencia}`);
      fetchPacientes(); // Recargar la lista para reflejar el nuevo orden
      setSelectedUrgencia(null); // Resetear el picker
    } catch (error) {
      console.error('Error al actualizar urgencia:', error);
    }
  };

  const getColor = (urgencia: number) => {
    if (urgencia === 1) return '#FF0000';
    if (urgencia === 2) return '#FFD600';
    return '#00C853';
  };

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calcularEdad = (fechaNacimiento: string): number => {
    const hoy = new Date('2025-09-16'); // Fecha actual fija para consistencia
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

 const renderItem = ({ item }: { item: Paciente }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedId(selectedId === item.id ? null : item.id);
        setSelectedUrgencia(item.urgencia); // Inicializar el picker con la urgencia actual
      }}
    >
      <View style={[styles.circle, { backgroundColor: getColor(item.urgencia) }]} />
      {selectedId === item.id && (
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.sintomas}>{item.sintomas}</Text>
          <View style={styles.urgenciaContainer}>
            <Text style={styles.urgenciaLabel}>Cambiar Urgencia:</Text>
            <Picker
              selectedValue={selectedUrgencia}
              onValueChange={(value) => {
                setSelectedUrgencia(value);
                if (value !== null) {
                  handleCambiarUrgencia(item.id, value); // Solo llamar si value no es null
                }
              }}
              style={styles.picker}
            >
              <Picker.Item label="1 (Alta)" value={1} />
              <Picker.Item label="2 (Media)" value={2} />
              <Picker.Item label="3 (Baja)" value={3} />
            </Picker>
          </View>
          <CustomButton
            title="Atender"
            onPress={() => handleAtenderPaciente(item.id)}
            style={styles.atenderButton}
          />
        </View>
      )}
    </TouchableOpacity>
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
      <Text style={styles.header}>Bienvenido, {email}</Text>
      <CustomButton
        title="Agregar a sala de Espera"
        onPress={() => navigation.navigate('RegisterPaciente')}
      />
      <CustomButton
        title="Ver Pacientes Atendidos Hoy"
        onPress={() => navigation.navigate('PacientesAtendidosHoy', { refresh: true })}
        style={styles.historialButton}
      />
      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes en la lista de espera</Text>
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
    minHeight: 10
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
    width: '100%', // Asegurar que ocupe todo el ancho disponible
    marginTop: 8, // Espacio entre nombre y detalles
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
  urgenciaContainer: {
    marginTop: 8,
  },
  urgenciaLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  picker: {
    height: 60,
    width: 200,
  },
  atenderButton: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  historialButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
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
});