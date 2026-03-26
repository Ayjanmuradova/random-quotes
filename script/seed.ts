// seed.ts
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { quotes as localQuotes } from './data';
dotenv.config({ path: '.env.local' });  
dotenv.config();

const uri = process.env.MONGO_CONNECTION_URL ?? '';

async function seedQuotes() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('random-quotes');
    const collection = db.collection('quotes');

    const existingCount = await collection.countDocuments({ createdBy: null });
    if (existingCount > 0) {
      console.log(`${existingCount} seeded quotes already exist. Skipping.`);
      return; 
    }

    const result = await collection.insertMany(
      localQuotes.map((q) => ({
        ...q,
        likeCount: 0,
        createdBy: null,
        createdByName: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log(`Inserted ${result.insertedCount} quotes into MongoDB.`);

  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await client.close();
  }
}

seedQuotes().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});