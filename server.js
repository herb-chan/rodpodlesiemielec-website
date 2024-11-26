require('dotenv').config(); // Ładowanie zmiennych środowiskowych z pliku .env
const { createServer } = require('http');
const next = require('next');
const dbConnect = require('./src/utils/database_connect'); // Import funkcji do połączenia z bazą danych

const dev = process.env.NODE_ENV !== 'production'; // Ustawienie środowiska na produkcyjne lub deweloperskie
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await dbConnect(); // Połączenie z bazą danych

  createServer((req, res) => {
    handle(req, res); // Obsługa wszystkich zapytań przez Next.js
  }).listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT}`); // Informacja o uruchomieniu serwera na porcie z .env
  });
});
