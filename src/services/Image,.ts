import { UnsplashImage } from '../routes/types'
import axios from 'axios'
import { unsplashAccessKey } from '../config/env'

export async function getUnsplashImage (): Promise<UnsplashImage> {
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get<UnsplashImage>(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`)
    const myUnsplashImage: UnsplashImage = {
      id: response.data.id,
      urls: response.data.urls,
      user: response.data.user
    }
    return myUnsplashImage
  } catch (error) {
    console.log(error)
    throw error
  }
}
