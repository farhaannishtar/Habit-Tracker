import clientPromise from "../../lib/mongodb";

export default async function handler(request, response) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("HabitTracker");
    const collection = db.collection("HabitLists");
    const results = await collection.insertOne({
      slug: `${request.body.slug}`,
      listName: `${request.body.listName}`,
    });
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}
