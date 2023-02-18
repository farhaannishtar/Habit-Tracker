import clientPromise from '../../lib/mongodb';

export default async function handler(request, response) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("HabitTracker");
    const collection = db.collection("Habits");
    const results = await collection
      .insertOne(
        {
          text: `${request.body.text}`,
          emoji: `${request.body.emoji}`,
          completed: false,
          slug: `${request.body.slug}`,
        }
      )
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}