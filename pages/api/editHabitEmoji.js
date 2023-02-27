import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  try {
    const { id, editedEmoji } = request.body;

    const mongoClient = await clientPromise;
    const db = mongoClient.db("HabitTracker");
    const collection = db.collection("Habits");
    const results = await collection.updateOne(
      {
        _id: ObjectId(id),
      },
      [{ $set: { emoji: editedEmoji } }]
    );
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}
