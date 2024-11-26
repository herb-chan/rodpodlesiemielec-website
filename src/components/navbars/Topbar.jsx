import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/components/Topbar.module.css';

const Topbar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h1>ROD Podlesie</h1>
        <nav className={styles.navigation}>
          <button
            className={styles.button}
            onClick={() => handleNavigation('/')}>
            <p>
              <FontAwesomeIcon icon={faHouse} /> Strona główna
            </p>
          </button>
          <button
            className={styles.button}
            onClick={() => handleNavigation('/')}>
            <p>Aktualności</p>
          </button>
          <button
            className={styles.button}
            onClick={() => handleNavigation('/')}>
            <p>Galeria</p>
          </button>
          <button
            className={styles.button}
            onClick={() => handleNavigation('/')}>
            <p>Druki</p>
          </button>
          <button
            className={styles.button}
            onClick={() => handleNavigation('/')}>
            <p>Opłaty</p>
          </button>
          <button
            className={styles.button}
            onClick={() => handleNavigation('/')}>
            <p>Struktura ROD</p>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Topbar;
