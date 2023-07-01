import express from 'express'
import activityImageRouter from './routes/Activity'
import cors from 'cors';
import userRouter from "./routes/Users"
import { connectToDb } from './db';







export const app = express()

// Middlewares
app.use(cors());
app.use(express.json())



/* // Configuración de Mongoose
const mongoURI = "mongodb+srv://franciscoluna82:ZmPTK22cJZMXDEqD@hobbie-app.7whwcko.mongodb.net"; // Reemplaza con la URL de tu base de datos MongoDB
 mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to Distribution API Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Initial Distribution API Database connection error occured -`,
          err
        );
      });

 */

// Using routing
app.use('/activity', activityImageRouter)
app.use('/users', userRouter )


