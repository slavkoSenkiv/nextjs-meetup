import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-Meetup

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const data = req.body;

    const client = await MongoClient.connect(process.env.DB_URL);

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted' });
  }
}
