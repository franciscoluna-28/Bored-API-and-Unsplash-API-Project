import { UnsplashImage } from '../routes/types'
import axios from 'axios'
import { unsplashAccessKey } from '../config/env'

// Getting an image from unsplash according to a keyword argument
export async function getUnsplashImage (query: string): Promise<UnsplashImage> {
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get<{ results: UnsplashImage[] }>(`https://api.unsplash.com/search/photos?client_id=${unsplashAccessKey}&query=${query}`)
    const results = response.data.results
    if (results.length === 0) {
      throw new Error('No images found on Unsplash for the specified keyword')
    }
    const myUnsplashImage: UnsplashImage = {
      id: results[0].id,
      urls: results[0].urls,
      user: results[0].user
    }
    return myUnsplashImage
  } catch (error) {
    console.log(error)
    throw error
  }
}
