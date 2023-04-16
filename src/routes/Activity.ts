import { Router, Request, Response } from 'express'
import { getRandomActivityWithImage } from '../routes/UnsplashImage'

export const router: Router = Router()

// Get a random activity with an image from Unsplash
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const activityWithImage = await getRandomActivityWithImage()
    res.status(200).json({ message: 'Random activity with image successfully retrieved!', data: activityWithImage })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving random activity with image' })
  }
})

export default router
