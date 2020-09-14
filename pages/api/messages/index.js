import { connectToDatabase } from '../../../utils/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const shipwrecks = await db.collection('shipwrecks').find({}).limit(20).toArray();

  res.json({ shipwrecks });
};
