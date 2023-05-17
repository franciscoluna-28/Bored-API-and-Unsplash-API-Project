import { getActivity, getActivityByType } from '../services/Activity';
import { getUnsplashImage } from '../services/Image';
import { getBestKeyword } from '../services/Helpers/KeywordExtractor';
import { Activity, CustomActivity } from '../routes/types';

// Get random activity with an image from Unsplash
export async function getRandomActivityWithImage(type?: string): Promise<CustomActivity> {
  try {
    let activity: Activity;

    if (type) {
      activity = await getActivityByType(type);
    } else {
      activity = await getActivity();
    }

    console.log(`Activity: ${activity.activity}`);
    const keyword = getBestKeyword(activity);
    console.log(`Best keyword: ${keyword}`);

    const image = await getUnsplashImage(keyword);
    console.log(`Image ID: ${image.id}`);

    if (image.urls != null) {
      console.log(`Image URL: ${image.urls.regular}`);
    } else {
      console.log('Image URL not found');
    }

    const customActivity: CustomActivity = {
      ...activity,
      image
    };

    return customActivity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

