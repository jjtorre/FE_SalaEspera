export interface Paciente {
  id: string;
  nombre: string;
  fecha_nacimiento: string;
  sintomas: string;
  urgencia: number;
  expediente: string;
  ritmo_cardiaco: number | null;
  oxigeno_sangre: number | null;
  atendido: boolean;
}