import dotenv from 'dotenv'
/* import { getUnsplashImage } from './services/Image,' */
import { getActivity } from './services/Activity'
import { getBestKeyword } from './services/Helpers/KeywordExtractor'

// Setting up environment variables
dotenv.config()

/* getUnsplashImage().then(res => console.log(res))
  .catch(err => console.log(err)) */

function main (): void {
  getActivity()
    .then((activity) => {
      console.log(`Activity: ${activity.activity}`)
      const keyword = getBestKeyword(activity)
      console.log(`Best keyword: ${keyword}`)
    })
    .catch((error) => {
      console.log(error)
    })
}

main()
