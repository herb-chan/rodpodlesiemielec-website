import React from 'react';
import styles from '@styles/index.module.css';
import Header from '@/components/typography/Header';

function NoticeBoard() {
  return (
    <div className={styles.container}>
      <Header size="h1" text="Tablica ogłoszeń" sectionID="ostatnie" />
    </div>
  );
}

export default NoticeBoard;
