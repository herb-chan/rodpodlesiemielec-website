import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/components/About.module.css';

const About = ({ content }) => {
  return (
    <div className={styles.aboutContainer}>
      <button className={styles.button}>
        <FontAwesomeIcon icon={faQuestionCircle} className={styles.icon} />
      </button>
      <div className={styles.tooltip}>
        <div className={styles.inner_tooltip}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
