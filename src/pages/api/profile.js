import { withDB } from '@/utils/dbMiddleware';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    const { username } = req.query;
    const connection = req.db;

    try {
      // First query to get user, plot, and additional fees data
      const [userRows] = await connection.execute(
        `SELECT u.*, d.*, dz.*, o.Inne, o.Inwestycyjna, o.Odsetki, o.Upomnienia, o.\`Wstępna OZ\`, o.\`Wstępna ROD\`, o.Zaległe, uu.Motyw
          FROM t_Użytkownicy u
          JOIN t_Działkowcy d ON u.\`ID działkowca\` = d.\`ID działkowca\`
          JOIN t_Działki dz ON d.\`Numer działki\` = dz.\`Numer działki\` 
          AND d.\`Sufiks działki\` = dz.\`Sufiks działki\`
          LEFT JOIN t_OpłatyDodatkowe o ON dz.\`Numer działki\` = o.\`Numer działki\` 
          AND dz.\`Sufiks działki\` = o.\`Sufiks działki\`
          JOIN t_UstawieniaUżytkowników uu ON
	        u.\`ID użytkownika\` = uu.ID_Użytkownika
          WHERE u.Login = ?`,
        [username]
      );

      if (userRows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'Użytkownik nie istnieje.' });
      }

      // Second query to get data from t_OpłatyStałe
      const [opłatyStałeRows] = await connection.execute(
        `SELECT * FROM t_OpłatyStałe`
      );

      // Assuming there's only one row in t_OpłatyStałe
      const opłatyStałeData = opłatyStałeRows[0];

      const userData = userRows[0];
      const response = {
        użytkownik: {
          login: userData.Login,
          motyw: userData.Motyw,
        },
        działkowiec: {
          imię: userData.Imię,
          nazwisko: userData.Nazwisko,
          adres_zamieszkania: userData['Adres zamieszkania'],
          adres_korespondencji: userData['Adres korespondencji'],
          numer_telefonu: userData['Numer telefonu'],
          email: userData['Adres email'],
        },
        działka: {
          numer: userData['Numer działki'],
          sufiks: userData['Sufiks działki'],
          powierzchnia: userData['Powierzchnia działki'],
          początkowy_stan_licznika: userData['Początkowy stan licznika'],
          końcowy_stan_licznika: userData['Końcowy stan licznika'],
          różnica_stanów_licznika:
            userData['Końcowy stan licznika'] -
            userData['Początkowy stan licznika'],
        },
        opłaty: {
          stawki: {
            cena_kwh: opłatyStałeData['Cena kWh'] || 1,
            stawka_za_powierzchnię:
              opłatyStałeData['Stawka za powierzchnię'] || 0.9,
          },
          stałe: {
            metraż:
              userData['Powierzchnia działki'] *
              opłatyStałeData['Stawka za powierzchnię'],
            za_prąd:
              (userData['Końcowy stan licznika'] -
                userData['Początkowy stan licznika']) *
              opłatyStałeData['Cena kWh'],
            członkowska: opłatyStałeData['Opłata członkowska'] || 6,
            licznikowa: opłatyStałeData['Opłata licznikowa'] || 25,
            za_odpady: opłatyStałeData['Opłata za odpady'] || 60,
          },
          dodatkowe: {
            inne: userData['Inne'] || 0,
            inwestycyjna: userData['Inwestycyjna'] || 0,
            odsetki: userData['Odsetki'] || 0,
            upomnienia: userData['Upomnienia'] || 0,
            wstępna_oz: userData['Wstępna OZ'] || 0,
            wstępna_rod: userData['Wstępna ROD'] || 0,
            zaległe: userData['Zaległe'] || 0,
          },
        },
      };

      return res.status(200).json({ success: true, user: response });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({
        success: false,
        message: 'Wystąpił błąd podczas pobierania danych.',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Metoda ${method} jest niedozwolona.`);
  }
};

export default withDB(handler); // Apply the middleware
