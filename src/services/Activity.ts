import axios from 'axios'
import { Activity } from '../routes/types'

// Getting an activity from Bored API
export async function getActivity (): Promise<Activity> {
  try {
    const response = await axios.get<Activity>('https://www.boredapi.com/api/activity/')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Getting an activity from Bored API according to its type
export async function getActivityByType (type: string): Promise<Activity> {
  try {
    const response = await axios.get<Activity>(`https://www.boredapi.com/api/activity/?type=${type}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}





