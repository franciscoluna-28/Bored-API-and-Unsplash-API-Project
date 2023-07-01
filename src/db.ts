import { MongoClient } from "mongodb";

let dbConnection;

export function connectToDb(cb) {
  MongoClient.connect(
    "mongodb+srv://franciscoluna82:ZmPTK22cJZMXDEqD@hobbie-app.7whwcko.mongodb.net",
  )
    .then((client) => {
      console.log("Database connection was successful!");
      dbConnection = client.db();
      cb(null, dbConnection);
    })
    .catch((error) => {
      console.log(error);
      cb(error);
    });
}


export function getDb() {
  return dbConnection;
}


