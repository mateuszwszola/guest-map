import { connectToDatabase } from '../../../utils/mongodb';

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    const messages = await db.collection('messages').find({}).limit(100).toArray();

    res.json({ messages });
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message || 'Unable to get messages' });
  }
};
