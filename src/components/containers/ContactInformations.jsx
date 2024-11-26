import React from 'react';
import styles from '@styles/components/ContactInformations.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCity,
  faEnvelope,
  faLocationDot,
  faPhone,
  faRoad,
} from '@fortawesome/free-solid-svg-icons';

const ContactInformations = () => {
  return (
    <div className={styles.both_containers}>
      <div className={styles.container}>
        <div className={styles.info_container}>
          <div className={styles.details_container}>
            <p>
              <span className={styles.detail_title}>
                <FontAwesomeIcon icon={faCity} /> Miasto:
              </span>{' '}
              {process.env.NEXT_PUBLIC_ROD_ADDRESS_CITY}
            </p>
            <p>
              <span className={styles.detail_title}>
                <FontAwesomeIcon icon={faRoad} /> Ulica:
              </span>{' '}
              {process.env.NEXT_PUBLIC_ROD_ADDRESS_ROAD}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.info_container}>
          <div className={styles.details_container}>
            <p>
              <span className={styles.detail_title}>
                <FontAwesomeIcon icon={faPhone} /> Numer kontaktowy:
              </span>{' '}
              {process.env.NEXT_PUBLIC_ROD_PHONE_NUMBER}
            </p>
            <p>
              <span className={styles.detail_title}>
                <FontAwesomeIcon icon={faEnvelope} /> Adres E-mail:
              </span>{' '}
              {process.env.NEXT_PUBLIC_ROD_EMAIL_ADDRESS}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformations;
