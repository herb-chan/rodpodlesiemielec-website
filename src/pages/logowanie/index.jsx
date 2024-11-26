import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/components/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [wrongUsername, setWrongUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Resetting errors
    setWrongUsername(false);
    setWrongPassword(false);
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Proszę wypełnić wszystkie pola.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('username', username);
        router.push('/profil');
      } else {
        if (data.message.includes('Nazwa użytkownika')) {
          setWrongUsername(true);
        } else if (data.message.includes('hasło')) {
          setWrongPassword(true);
        }
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Wystąpił błąd serwera. Spróbuj ponownie później.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.input_fields}>
          <div className={styles.input_and_communicate}>
            <input
              type="text"
              placeholder="Nazwa użytkownika..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${styles.input} ${wrongUsername ? styles.input_error : ''}`}
            />
            <div className={styles.communicate_container}>
              {wrongUsername && (
                <p className={styles.communicate}>
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Podana nazwa
                  użytkownika nie występuje w systemie.
                </p>
              )}
            </div>
          </div>
          <div className={styles.input_and_communicate}>
            <input
              type="password"
              placeholder="Hasło..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${wrongPassword ? styles.input_error : ''}`}
            />
            <div className={styles.communicate_container}>
              {wrongPassword && (
                <p className={styles.communicate}>
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Podane hasło
                  nie odpowiada hasłu zapisanemu dla podanej nazwy użytkownika.
                </p>
              )}
            </div>
          </div>
          <button type="submit" className={styles.button}>
            <p>Zaloguj się</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
