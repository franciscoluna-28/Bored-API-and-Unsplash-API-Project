
export type Accessibility = ' ' | number

//  TODO We need to make validations for the type of
// Accessibility since returns a value between 0 and 1

// Enums
export enum ActivityType {
  Education = 'education',
  Recreational = 'recreational',
  Social = 'social',
  DIY = 'diy',
  Charity = 'charity',
  Cooking = 'cooking',
  Relaxation = 'relaxation',
  Music = 'music',
  Busywork = 'busywork',
}

// Intefaces
export interface Activity {
  participants: number
  activity: string
  type: ActivityType
  price: number
  link: string
  key: string
  accessibility: Accessibility
}

export interface UnsplashImage {
  id: string
  urls?: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
  user?: {
    name: string
    links: {
      self: string
      phothos: string
    }
  }
}

// Activity with Unsplash Image Properties
export interface CustomActivity extends Activity {
  image?: UnsplashImage
}
