import React from 'react';
import OfficeInfo from './OfficeInfo';
import GateInfo from './GateInfo';
import styles from '@styles/components/DayInfo.module.css';

function DayInfo() {
  return (
    <div className={styles.container}>
      <OfficeInfo />
      <GateInfo />
    </div>
  );
}

export default DayInfo;
