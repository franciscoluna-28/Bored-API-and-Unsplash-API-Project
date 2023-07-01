import axios from 'axios'
import { Activity } from '../routes/types'

type ModifiedActivity = Activity & { id: string };

// Obtener una actividad de la API de Bored
export async function getActivity(): Promise<ModifiedActivity> {
  try {
    const response = await axios.get<Activity>('https://www.boredapi.com/api/activity/')
    const modifiedResponse: ModifiedActivity = {
      ...response.data,
      id: response.data.key, // Cambiar el nombre de la propiedad 'key' a 'id'
    };
    delete (modifiedResponse as any).key; // Eliminar la propiedad 'key'
    console.log(modifiedResponse);
    return modifiedResponse;
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Obtener una actividad de la API de Bored según su tipo
export async function getActivityByType(type: string): Promise<ModifiedActivity> {
  try {
    const response = await axios.get<Activity>(`https://www.boredapi.com/api/activity/?type=${type}`)
    const modifiedResponse: ModifiedActivity = {
      ...response.data,
      id: response.data.key, // Cambiar el nombre de la propiedad 'key' a 'id'
    };
    delete (modifiedResponse as any).key; // Eliminar la propiedad 'key'
    console.log(modifiedResponse);
    return modifiedResponse;
  } catch (error) {
    console.log(error)
    throw error
  }
}

