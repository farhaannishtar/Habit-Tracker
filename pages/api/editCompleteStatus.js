import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  try {
    console.log("Inside editCompleted Habit: ");
    console.log("request.body: ", request.body);
    const { id, isCompleted } = request.body;
    console.log("id: ", id, "isCompleted: ", isCompleted, "typeof id: ", typeof id);
    const mongoClient = await clientPromise;
    const db = mongoClient.db("HabitTracker");
    const collection = db.collection("Habits");
    const results = await collection
    .updateOne({
      "_id": ObjectId(id),
    },
    [
      { "$set": { "completed": { "$not": "$completed" } } }
    ]  
    )
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}
