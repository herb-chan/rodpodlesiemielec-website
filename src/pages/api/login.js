import { withDB } from '@/utils/dbMiddleware';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Proszę wypełnić wszystkie pola.' });
    }

    const connection = req.db;

    try {
      // Fetch user data from the database
      const [rows] = await connection.execute(
        'SELECT * FROM t_Użytkownicy WHERE Login = ?',
        [username]
      );

      if (rows.length === 0) {
        return res
          .status(401)
          .json({ message: 'Nazwa użytkownika nie istnieje.' });
      }

      const user = rows[0];

      // Compare the plain text password
      if (password !== user.Hasło) {
        return res.status(401).json({ message: 'Niepoprawne hasło.' });
      }

      // If login is successful
      res.status(200).json({
        message: 'Zalogowano pomyślnie',
        userId: user['ID użytkownika'],
      });
    } catch (error) {
      console.error('Error during login process:', error);
      res.status(500).json({ message: 'Wystąpił błąd serwera.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metoda ${req.method} jest niedozwolona.`);
  }
};

export default withDB(handler); // Apply the middleware
