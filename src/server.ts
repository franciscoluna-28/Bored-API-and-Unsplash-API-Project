import express from 'express'
import activityImageRouter from './routes/Activity'
import cors from 'cors';


const app = express()
app.use(cors());


// Using routing
app.use('/activity', activityImageRouter)

export default app
