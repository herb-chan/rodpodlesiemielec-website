import React from 'react';
import styles from '@styles/index.module.css';
import Header from '@/components/typography/Header';
import FileList from '@/components/containers/FileList';

function PrintsPage() {
  return (
    <div className={styles.container}>
      <Header size="h1" text="Druki" sectionID="idk" />
      <FileList />
    </div>
  );
}

export default PrintsPage;
