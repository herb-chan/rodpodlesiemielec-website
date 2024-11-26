import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/components/Sidebar.module.css';
import {
  faTree,
  faHouse,
  faClipboard,
  faUsers,
  faCashRegister,
  faUser,
  faEnvelope,
  faImage,
  faThumbTack,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onMenuItemClick }) => {
  // Define menu items here with grouping
  const pageItems = [
    { label: 'Strona główna', link: '/', icon: faHouse },
    { label: 'Aktualności', link: '/aktualnosci/1', icon: faClipboard },
    { label: 'Galeria', link: '/galeria', icon: faImage },
    { label: 'Tablica ogłoszeń', link: '/tablica', icon: faThumbTack },
    { label: 'Druki', link: '/druki', icon: faClipboard },
    { label: 'Opłaty', link: '/oplaty', icon: faCashRegister },
    { label: 'Struktura ROD', link: '/struktura', icon: faUsers },
    { label: 'Kontakt', link: '/kontakt', icon: faEnvelope },
  ];

  const profileSettingsItems = [
    { label: 'Profil działkowca', link: '/profil', icon: faUser },
    { label: 'Ustawienia', link: '/ustawienia', icon: faCog },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>
          <FontAwesomeIcon icon={faTree} /> ROD Podlesie
        </h2>
      </div>
      <div className={styles.options}>
        <ul className={styles.menu}>
          {pageItems.map((item, index) => (
            <li
              key={`page-${index}`}
              className={styles.menu_item}
              onClick={() => onMenuItemClick(item.link)}>
              <div className={styles.icon_container}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              </div>
              {item.label}
            </li>
          ))}
        </ul>
        <ul className={styles.menu}>
          {profileSettingsItems.map((item, index) => (
            <li
              key={`profile-${index}`}
              className={styles.menu_item}
              onClick={() => onMenuItemClick(item.link)}>
              <div className={styles.icon_container}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              </div>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
