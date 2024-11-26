import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCog,
  faRightFromBracket,
  faSeedling,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/components/Profile.module.css';

const ProfileLayout = ({ children, activeCategory }) => {
  return (
    <div className={styles.container}>
      <h1>Ustawienia profilu</h1>
      <div className={styles.content}>
        <div className={styles.categories}>
          <h4>Profil</h4>
          <div className={styles.buttons}>
            <Link href="/profil/dzialkowiec">
              <a
                className={`${styles.button} ${activeCategory === 'działkowiec' ? styles.active : ''}`}>
                <p>
                  <div>
                    <FontAwesomeIcon icon={faUser} /> Działkowiec
                  </div>
                  <FontAwesomeIcon icon={faCaretRight} />
                </p>
              </a>
            </Link>
            <Link href="/profil/dzialka">
              <a
                className={`${styles.button} ${activeCategory === 'działka' ? styles.active : ''}`}>
                <p>
                  <div>
                    <FontAwesomeIcon icon={faSeedling} /> Działka
                  </div>
                  <FontAwesomeIcon icon={faCaretRight} />
                </p>
              </a>
            </Link>
            <Link href="/profil/ustawienia">
              <a
                className={`${styles.button} ${activeCategory === 'ustawienia' ? styles.active : ''}`}>
                <p>
                  <div>
                    <FontAwesomeIcon icon={faCog} /> Ustawienia
                  </div>
                  <FontAwesomeIcon icon={faCaretRight} />
                </p>
              </a>
            </Link>
            <button
              className={`${styles.button} ${styles.logout}`}
              onClick={() => {
                localStorage.removeItem('username');
                router.push('/logowanie');
              }}>
              <p>
                <div>
                  <FontAwesomeIcon icon={faRightFromBracket} /> Wyloguj się
                </div>
                <FontAwesomeIcon icon={faCaretRight} />
              </p>
            </button>
          </div>
        </div>
        <div className={styles.category_content}>{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
