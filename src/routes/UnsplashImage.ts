import { getActivity } from '../services/Activity'
import { getUnsplashImage } from '../services/Image'
import { getBestKeyword } from '../services/Helpers/KeywordExtractor'
/* import { UnsplashImage } from '../routes/types' */

// Get random image from keyword
export async function getRandomActivityWithImage (): Promise<void> {
  try {
    const activity = await getActivity()
    console.log(`Activity: ${activity.activity}`)
    const keyword = getBestKeyword(activity)
    console.log(`Best keyword: ${keyword}`)

    const image = await getUnsplashImage(keyword)
    console.log(`Image ID: ${image.id}`)
    if (image.urls != null) {
      console.log(`Image URL: ${image.urls.regular}`)
    } else {
      console.log('Image URL not found')
    }
  } catch (error) {
    console.log(error)
  }
}
