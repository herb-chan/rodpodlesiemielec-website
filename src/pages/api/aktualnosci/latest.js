import dbConnect from '@utils/database_connect';

export default async function handler(req, res) {
  try {
    const client = await dbConnect();
    const db = client.db('rodpodlesie');

    // Fetch the two latest posts
    const latestPosts = await db
      .collection('posty')
      .find({})
      .sort({ createdAt: -1 }) // Sort by date, newest first
      .limit(2)
      .toArray();

    return res.status(200).json({ posts: latestPosts });
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return res.status(500).json({ error: 'Error fetching latest posts' });
  }
}
