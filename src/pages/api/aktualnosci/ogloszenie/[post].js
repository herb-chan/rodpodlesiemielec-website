// pages/api/aktualnosci/ogloszenie/[postId].js

import dbConnect from '@utils/database_connect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { postId } = req.query; // Get the postId from the query

  try {
    const client = await dbConnect();
    const db = client.db('rodpodlesie');

    // Convert postId to ObjectId
    const post = await db
      .collection('posty')
      .findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
