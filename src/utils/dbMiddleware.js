import dbConnect from './dbConnect';

export const withDB = (handler) => {
  return async (req, res) => {
    let connection;
    try {
      connection = await dbConnect();
      req.db = connection; // Attach the connection to the request
      return await handler(req, res);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Wystąpił błąd serwera.' });
    } finally {
      if (connection) {
        try {
          connection.release(); // Always release the connection
        } catch (error) {
          console.error('Error releasing connection:', error.message);
        }
      }
    }
  };
};
