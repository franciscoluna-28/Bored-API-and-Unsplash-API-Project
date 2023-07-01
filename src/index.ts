import { connectToDb } from "./db";
import { getDb } from "./db";


import { app } from "./server";

const port = 3000;
export let db 

// db connections
connectToDb((error) => {
  if (!error) {
    console.log("Sucess!")

    }
    db = getDb();
    })
  ;

        // Listening on port 3000
        app.listen(port, () => {
          if (port != null) {
            console.log(`Server listening at http://localhost:${port}`);
          } else {
            console.log("Invalid server port!");
          }})

