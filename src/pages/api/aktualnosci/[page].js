import dbConnect from '@utils/database_connect';

export default async function handler(req, res) {
  const { page = 1 } = req.query;
  const limit = 4;
  const skip = (page - 1) * limit;

  try {
    // Connect to the database
    const client = await dbConnect();
    const db = client.db('rodpodlesie');

    // Get the total number of posts
    const totalPosts = await db.collection('posty').countDocuments();

    // Fetch the posts for the current page, sorted by date (newest first)
    const posts = await db
      .collection('posty')
      .find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(limit)
      .toArray();

    // Respond with the posts and pagination data
    return res.status(200).json({
      posts,
      totalPosts,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Error fetching posts' });
  }
}
