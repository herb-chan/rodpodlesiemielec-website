const mysql = require('mysql2/promise');

(async () => {
  try {
    // Establish a connection to the database
    const connection = await mysql.createConnection({
      host: 's18.cyber-folks.pl',
      user: 'herbchan_herbert',
      password: 'Stalfks123#CF',
      database: 'herbchan_rodpodlesiemielec',
    });

    console.log('Połączono z bazą danych MySQL!');

    // Prepare the insert query for 368 users
    const insertQuery = 'INSERT INTO t_UstawieniaUżytkowników VALUES ?';

    // Create an array of values (id, 0) for each user (1 to 368)
    const values = [];
    for (let i = 512; i <= 879; i++) {
      values.push([i, 0]); // Add (id, 0) for each user
    }

    // Execute the insert query with the generated values
    const [result] = await connection.query(insertQuery, [values]);

    console.log(`Wstawiono ${result.affectedRows} rekordów!`);

    // Close the connection
    await connection.end();
  } catch (err) {
    console.error('Błąd:', err.message);
  }
})();
