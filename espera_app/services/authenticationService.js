

import axios from 'axios';

const API_URL = 'https://be-salaespera.onrender.com'; // reemplazá con tu URL real

//const API_URL = 'http://10.0.2.2:8000';  //Para android Studio


// Registrar nuevo usuario
export const registerService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response.data; // { user }
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error en el registro');
  }
};

// Iniciar sesión
export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data; // { user, session }
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
  }
};



