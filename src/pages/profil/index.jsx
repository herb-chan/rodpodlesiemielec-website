import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/components/Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonTemplate from '@/components/buttons/ButtonTemplate';
import {
  faCaretRight,
  faCog,
  faRightFromBracket,
  faSeedling,
  faUser,
  faCashRegister,
  faBell,
  faSun,
  faMoon,
  faAdjust,
  faCircleHalfStroke,
  faDropletSlash, // Placeholder icon for contrast and grayscale
} from '@fortawesome/free-solid-svg-icons';
import TabToggle from '@/components/buttons/TabToggle'; // Import TabToggle component
import { setTheme } from '@/utils/themeToggle'; // Import theme utility functions

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('działkowiec');
  const [selectedTab, setSelectedTab] = useState(0); // Added selectedTab state for controlling theme
  const router = useRouter();

  const themeMapping = ['light', 'high-contrast', 'grayscale', 'dark'];

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetch(`/api/profile?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);

            // Set theme after user data is fetched
            const storedTheme = themeMapping[data.user.użytkownik.motyw];
            console.log('Theme set from user or localStorage:', storedTheme);
            setTheme(storedTheme);

            // Update selected tab index
            const index = themeMapping.indexOf(storedTheme);
            setSelectedTab(index >= 0 ? index : 0);
          } else {
            router.push('/logowanie');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          router.push('/logowanie');
        });
    } else {
      router.push('/logowanie');
    }
  }, [router]);

  const handleCategoryToggle = (category) => {
    setActiveCategory(category);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('theme');
    router.push('/logowanie');
  };

  const handleThemeChange = (index) => {
    const selectedTheme = themeMapping[index];
    console.log('Theme change requested:', selectedTheme);

    setSelectedTab(index); // Update selectedTab state when theme changes
    setTheme(selectedTheme); // Apply the theme

    // Update the theme in the database
    fetch('/api/update-theme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.użytkownik.login,
        theme: selectedTheme,
      }),
    }).then((res) => {
      if (!res.ok) {
        console.error('Failed to update theme in the database');
      } else {
        console.log('Theme updated in the database');
      }
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>Ustawienia profilu</h1>
      <div className={styles.content}>
        <div className={styles.categories}>
          <h4>Profil</h4>
          <div className={styles.buttons}>
            <ButtonTemplate
              text={'Działkowiec'}
              icon={faUser}
              textPosition="left"
              variant="borderless_text_icon"
              type={activeCategory === 'działkowiec' ? 'success' : 'neutral'}
              size="large"
              onClick={() => handleCategoryToggle('działkowiec')}
            />
            <ButtonTemplate
              text={'Działka'}
              icon={faSeedling}
              textPosition="left"
              variant="borderless_text_icon"
              type={activeCategory === 'działka' ? 'success' : 'neutral'}
              size="large"
              onClick={() => handleCategoryToggle('działka')}
            />
            <ButtonTemplate
              text={'Opłaty'}
              icon={faCashRegister}
              textPosition="left"
              variant="borderless_text_icon"
              type={activeCategory === 'opłaty' ? 'success' : 'neutral'}
              size="large"
              onClick={() => handleCategoryToggle('opłaty')}
            />
            <ButtonTemplate
              text={'Powiadomienia'}
              icon={faBell}
              textPosition="left"
              variant="borderless_text_icon"
              type={activeCategory === 'powiadomienia' ? 'success' : 'neutral'}
              size="large"
              onClick={() => handleCategoryToggle('powiadomienia')}
            />
            <ButtonTemplate
              text={'Ustawienia'}
              icon={faCog}
              textPosition="left"
              variant="borderless_text_icon"
              type={activeCategory === 'ustawienia' ? 'success' : 'neutral'}
              size="large"
              onClick={() => handleCategoryToggle('ustawienia')}
            />
            <ButtonTemplate
              text={'Wyloguj się'}
              icon={faRightFromBracket}
              textPosition="left"
              variant="borderless_text_icon"
              type="error"
              size="large"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className={styles.category_content}>
          {activeCategory === 'działkowiec' && (
            <>
              <h4>Informacje o działkowcu</h4>
              <div className={styles.view}>
                <h6>Imię:</h6>
                <p>{user.działkowiec.imię}</p>
                <h6>Nazwisko:</h6>
                <p>{user.działkowiec.nazwisko}</p>
                <h6>Adres zamieszkania:</h6>
                <p>{user.działkowiec.adres_zamieszkania}</p>
                <h6>Adres korespondencji:</h6>
                <p>{user.działkowiec.adres_korespondencji}</p>
                <h6>Numer telefonu:</h6>
                <p>{user.działkowiec.numer_telefonu}</p>
                <h6>Adres email:</h6>
                <p>{user.działkowiec.email}</p>
              </div>
            </>
          )}
          {activeCategory === 'działka' && (
            <>
              <h4>Informacje o działce</h4>
              <div className={styles.view}>
                <h6>Numer działki:</h6>
                <p>
                  {user.działka
                    ? `${user.działka.numer}${user.działka.sufiks}`
                    : 'Brak'}
                </p>
                <h6>Powierzchnia:</h6>
                <p>{user.działka ? user.działka.powierzchnia : 'Brak'}</p>
                <h6>Początkowy stan licznika:</h6>
                <p>
                  {user.działka
                    ? `${user.działka.początkowy_stan_licznika}kWh`
                    : 'Brak'}
                </p>
                <h6>Końcowy stan licznika:</h6>
                <p>
                  {user.działka
                    ? `${user.działka.końcowy_stan_licznika}kWh`
                    : 'Brak'}
                </p>
                <h6>Różnica stanów licznika:</h6>
                <p>{user.działka.różnica_stanów_licznika} kWh</p>
              </div>
            </>
          )}
          {activeCategory === 'opłaty' && <h4>Opłaty za działkę</h4>}
          {activeCategory === 'powiadomienia' && <h4>Powiadomienia</h4>}
          {activeCategory === 'ustawienia' && (
            <>
              <h4>Ustawienia</h4>
              <div className={styles.view}>
                <div className={styles.box}>
                  <h6 className={styles.box_header}>Motyw strony:</h6>
                  <TabToggle
                    items={[
                      { label: 'Jasny', icon: faSun },
                      { label: 'Kontrast', icon: faCircleHalfStroke },
                      { label: 'Czarno-biały', icon: faDropletSlash },
                      { label: 'Ciemny', icon: faMoon },
                    ]}
                    selectedIndex={selectedTab}
                    onSelect={handleThemeChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
