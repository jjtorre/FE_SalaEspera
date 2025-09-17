
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
    const data = await response.json();
   return data.lista_espera; // Extraer el array lista_espera
  } catch (error) {
    throw new Error(error.message);
  }
};
export const atenderPaciente = async (pacienteId) => {
  const response = await fetch(`${URL}/pacientes/${pacienteId}/atender`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return response.json();
};

export const obtenerPacientesAtendidosHoy = async () => {
  const response = await fetch(`${URL}/pacientes_atendidos_hoy`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return response.json();
};

export const actualizarUrgencia = async (pacienteId, urgencia) => {
  const response = await fetch(`${URL}/pacientes/${pacienteId}/urgencia`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urgencia }),
  });
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return response.json();
};