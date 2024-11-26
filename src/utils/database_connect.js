const { MongoClient } = require('mongodb');

let cachedClient = null;

const dbConnect = async () => {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    console.log('Attempting to connect to MongoDB...'); // Log the connection attempt

    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();
    console.log('Successfully connected to MongoDB!'); // Log successful connection
    cachedClient = client;
    return cachedClient;
  } catch (error) {
    console.error('Error connecting to the database:', error.message); // Log the error message
    throw error;
  }
};

module.exports = dbConnect;
