import { Router, Request, Response } from 'express'
import { getRandomActivityWithImage } from '../routes/UnsplashImage'
import { CustomActivity } from './types'

export const router: Router = Router()

// Get a random activity with an image from Unsplash
router.get('/get-activity', async (_req: Request, res: Response): Promise<void> => {
  try {
    const activityWithImage = await getRandomActivityWithImage()
    res.status(200).json({ message: 'Random activity with image successfully retrieved!', data: activityWithImage })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving random activity with image' })
  }
})

router.get('/get-a-few-activities', async (_req: Request, res: Response): Promise<void> => {
  try {
    const activitiesWithImages: CustomActivity[] = []
    for (let i = 0; i < 2; i++) {
      const activityWithImage = await getRandomActivityWithImage()
      activitiesWithImages.push(activityWithImage)
    }

    const metadata = {
      dataFields: [
        {
          name: 'id',
          description: 'The unique identifier of the activity',
          type: 'string'
        },
        {
          name: 'activity',
          description: 'The name of the activity',
          type: 'string'
        },
        {
          name: 'type',
          description: 'The type of the activity',
          type: 'string'
        },
        {
          name: 'accessibility',
          description: 'A value between 0 and 1 indicating how accessible the activity is',
          type: 'number'
        },
        {
          name: 'participants',
          description: 'The number of participants required for the activity',
          type: 'number'
        },
        {
          name: 'price',
          description: 'A value between 0 and 1 indicating the cost of the activity',
          type: 'number'
        },
        {
          name: 'link',
          description: 'A link to more information about the activity',
          type: 'string'
        },
        {
          name: 'image',
          description: 'The URL of an image related to the activity',
          type: 'string'
        }
      ]
    }

    res.status(200).json({
      message: '5 random activities with images successfully retrieved!',
      metadata,
      data: activitiesWithImages
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving random activities with images' })
  }
})

export default router
