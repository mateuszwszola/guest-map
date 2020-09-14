import { connectToDatabase } from '../../../utils/mongodb';

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    const {
      message: { longitude, latitude, identity, message },
    } = req.body;

    const doc = await db.collection('messages').insertOne({
      message,
      user: {
        displayName: identity,
      },
      location: {
        geo: [longitude, latitude],
      },
      createdAt: new Date(),
    });

    res.status(201);
    res.json({ message: doc.ops[0] });
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message || 'Unable to create a message' });
  }
};
