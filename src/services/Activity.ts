import axios from 'axios'
import { Activity } from '../routes/types'

export async function getActivity (): Promise<Activity> {
  try {
    const response = await axios.get<Activity>('https://www.boredapi.com/api/activity/')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
