import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  try {
    console.log("~~~~~~~~~~~~~Inside updateCounter.js~~~~~~~~~~~~~~~~")
    console.log("request.body: ", request.body);
    let  { value } = request.body;

    const mongoClient = await clientPromise;
    const db = mongoClient.db("PracticeDB");
    const collection = db.collection("Buttons");
    const results = await collection
      .updateOne({
        "_id": ObjectId("63dd30b3c187cdfd9ec3aab8"),
      },
      { $set: 
        { 
          value: value + 1,
        },
      }
      )
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}