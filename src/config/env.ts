import dotenv from 'dotenv'

// Setting up environment variables
dotenv.config()

// Unsplash API key
export const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY

// Server port
export const serverPort = process.env.SERVER_PORT
