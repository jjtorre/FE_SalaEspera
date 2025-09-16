import axios from 'axios';
import { Alert } from 'react-native';



//const API_URL_GET = 'http://192.168.0.112:3000/api/breakdowns/breakdowns';

const URL = "https://be-salaespera.onrender.com"




export const registrarPaciente = async (paciente) => {
  try {
    const response = await fetch(`${URL}/pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error al registrar paciente');
    }

    return await response.json(); // { mensaje: "Paciente X registrado..." }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerListaEspera = async () => {
  try {
    const response = await fetch(`${URL}/pacientes`);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de espera');
    }
    return await response.json(); // Array de pacientes ordenados por urgencia
  } catch (error) {
    throw new Error(error.message);
  }
};
