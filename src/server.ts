import express from 'express'
import activityImageRouter from './routes/Activity'

const app = express()

// Using routing
app.use('/activity', activityImageRouter)

export default app
