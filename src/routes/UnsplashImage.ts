import { getActivity } from '../services/Activity'
import { getUnsplashImage } from '../services/Image'
import { getBestKeyword } from '../services/helpers/KeywordExtractor'
import { CustomActivity } from '../routes/types'

// Get random activity with an image from Unsplash
export async function getRandomActivityWithImage (): Promise<CustomActivity> {
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

    const customActivity: CustomActivity = {
      ...activity,
      image
    }

    return customActivity
  } catch (error) {
    console.log(error)
    throw error
  }
}
