import axios from "axios"
import dotenv from 'dotenv'

// Setting up environment variables
dotenv.config()

// Environment variables
const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY

// Testing bored API
axios.get('https://www.boredapi.com/api/activity/')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })

// Testing unsplash API
axios.get(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`)
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
