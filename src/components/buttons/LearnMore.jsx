import React from 'react';
import styles from '@styles/components/LearnMore.module.css';

function LearnMore({ path, label }) {
  return (
    <a href={path} className={styles.container}>
      {label}
    </a>
  );
}

export default LearnMore;
