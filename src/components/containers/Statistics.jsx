import React from 'react';
import styles from '@styles/components/Statistics.module.css';

const Statistics = ({ plots_count, members_count, year }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>ROD Podlesie</p>
        <h2>Nasz Ogród w liczbach:</h2>
      </div>
      <div className={styles.statistics}>
        <div className={styles.statistic}>
          <h1>{plots_count}</h1>
          <p>Liczba działek</p>
        </div>
        <div className={styles.statistic}>
          <h1>{members_count}</h1>
          <p>Liczba członków</p>
        </div>
        <div className={styles.statistic}>
          <h1>{year}</h1>
          <p>Rok założenia</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
