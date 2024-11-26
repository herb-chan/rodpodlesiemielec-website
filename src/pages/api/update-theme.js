// theme-update.js

import { withDB } from '@/utils/dbMiddleware';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { username, theme } = req.body;
    const connection = req.db;

    try {
      // Map theme names to numeric values (adjust this based on your database schema)
      const themeValueMap = {
        light: 0,
        'high-contrast': 1,
        grayscale: 2,
        dark: 3,
      };

      const themeValue = themeValueMap[theme];

      // Ensure theme value is valid
      if (themeValue === undefined) {
        return res
          .status(400)
          .json({ success: false, message: 'Nieznany motyw' });
      }

      // Update the user's theme in the database
      const [updateResult] = await connection.execute(
        'UPDATE t_UstawieniaUżytkowników SET Motyw = ? WHERE ID_Użytkownika = (SELECT `ID Użytkownika` FROM t_Użytkownicy WHERE Login = ?)',
        [themeValue, username]
      );

      if (updateResult.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'Użytkownik nie istnieje' });
      }

      return res
        .status(200)
        .json({ success: true, message: 'Motyw zaktualizowany' });
    } catch (error) {
      console.error('Błąd podczas aktualizacji motywu:', error);
      return res.status(500).json({ success: false, message: 'Błąd serwera' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metoda ${method} jest niedozwolona.`);
  }
};

export default withDB(handler);
