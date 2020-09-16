import { connectToDatabase } from '../../../utils/mongodb';

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    const errors = {};
    const requiredFields = ['longitude', 'latitude', 'identity', 'message'];
    requiredFields.map((field) => {
      if (!req.body[field]) {
        errors[field] = field + ' is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors });
    }

    const { message, identity, longitude, latitude } = req.body;

    const doc = await db.collection('messages').insertOne({
      message,
      user: {
        displayName: identity,
      },
      location: {
        type: 'Point',
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
