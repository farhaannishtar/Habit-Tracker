import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  try {
    console.log("~~~~~~~~~~~~~Inside getHabits.js~~~~~~~~~~~~~~~~")
    const mongoClient = await clientPromise;
    const db = mongoClient.db("HabitTracker");
    const collection = db.collection("Habits");
    const results = await collection
      .find()
      .toArray()
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
} 