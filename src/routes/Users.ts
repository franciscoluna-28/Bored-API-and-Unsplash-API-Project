import express, { Request, Response } from "express";
import { db } from "..";
import User from "../../models/User";

const router = express.Router();

// POST /users - Agregar un nuevo usuario
router.post("/register-user", async (req: Request, res: Response) => {
  const { email, uid } = req.body;
  const user = new User({
    email,
    uid,
    activityIds: [], // Establecer el valor por defecto como un array vacío
  });
  db.collection("users")
    .insertOne(user)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Could not create a new document!" });
    });
});

router.post("/get-current-user", async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(uid);
    // Check if the user is authenticated
    /*       if (uid === "") {
        return res.status(401).json({ error: "Unauthorized" });
      }
   */
    // Get the user from the database using the UID
    const user = db.collection("users").find({ _uid: uid }).then();
    console.log(user);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the user back to the frontend
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/add-activity-by-id/:uid", async (req: Request, res: Response) => {
  try {
    // Get the activity ID and data from the request body
    const {
      activityId,
      activity,
      type,
      price,
      link,
      accessibility,
      participants,
      image,
      email,
    } = req.body;

    const activityToAdd = {
      activity: activity,
      type: type,
      id: activityId,
      price: price,
      link: link,
      accessibility: accessibility,
      participants: participants,
      image: image,
      email: email,
      // Add any other details of the activity here
    };

    // First of all, we get the UID through the request header
    const uid = req.params.uid;

    // Then we get the current user and their ID
    const currentUser = await db.collection("users").findOne({ uid: uid });
    const currentUserID = currentUser._id;

    // Check if the activity is already saved by the user
    if (currentUser.activityIds.includes(activityId)) {
      return res
        .status(400)
        .json({ error: "Activity already saved by the user" });
    }

    // Now, we find the user by ID and update their activityIds
    await db
      .collection("users")
      .findOneAndUpdate(
        { _id: currentUserID },
        { $addToSet: { activityIds: activityId } },
        { upsert: true, new: true }
      );

    // Check if the activity already exists in the collection
    const existingActivity = await db
      .collection("activities")
      .findOne({ id: activityId });
    if (existingActivity) {
      return res.status(400).json({ error: "Activity already exists" });
    }

    // Save the new activity in the collection
    const insertedActivity = await db
      .collection("activities")
      .insertOne(activityToAdd);

    // Send a success response
    res.status(200).json(insertedActivity);
  } catch (error) {
    console.error("Error adding activity:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the activity" });
  }
});

// POST route to find all the available activities from an user
router.get(
  "/find-activities-by-user-uid/:uid",
  async (req: Request, res: Response) => {
    try {
      // Find the user by uid
      const user = await db
        .collection("users")
        .findOne({ uid: req.params.uid });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the activities using the activityIds array of the user
      const activities = await db
        .collection("activities")
        .find({ id: { $in: user.activityIds } })
        .toArray();

      // Send the activities as the response
      res.status(200).json(activities);
    } catch (error) {
      console.error("Error finding activities by user uid:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete(
  "/delete-activity-from-user/:uid",
  async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      // Then we get the current user and their ID
      const currentUser = await db.collection("users").findOne({ uid: uid });
      const currentUserID = currentUser._id;

      console.log(currentUserID);

      const activityIdToDelete = req.body.activityId; // Supongamos que recibes el ID de la actividad a eliminar en el cuerpo de la solicitud
      console.log(activityIdToDelete);
      // Actualizar la colección de usuarios eliminando la actividad del usuario actual
      await db
        .collection("users")
        .updateOne(
          { uid: uid },
          { $pull: { activityIds: activityIdToDelete } }
        );

      return res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;

/*     // Guardar el usuario en la base de datos
    const newUser = await user.save()
    console.log(newUser) */

export default router;
