import React from 'react';
import styles from '@styles/components/alerts/Adnotation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCheckCircle,
  faInfoCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const Adnotation = ({ type = 'info', header, content }) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return faExclamationCircle;
      case 'warning':
        return faExclamationTriangle;
      case 'success':
        return faCheckCircle;
      case 'info':
      default:
        return faInfoCircle;
    }
  };

  return (
    <div className={`${styles.container} ${styles[type]}`}>
      <div className={styles.header}>
        <div className={styles.inner_header}>
          <FontAwesomeIcon icon={getIcon()} /> <h4>{header}</h4>
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Adnotation;
