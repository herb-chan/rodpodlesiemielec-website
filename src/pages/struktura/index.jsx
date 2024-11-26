import React from 'react';
import styles from '@styles/index.module.css';
import Header from '@/components/typography/Header';
import Board from '@/components/containers/Board';
import {
  boardMembers,
  revisionComissionMembers,
  problemComissionMembers,
  additionalMembers,
} from '@/utils/member';

function StructurePage() {
  return (
    <div className={styles.container}>
      <Header size="h1" text="Struktura" sectionID="ostatnie" />
      <Header size="h2" text="Członkowie zarządu" sectionID="zarząd" />
      <div id="zarząd">
        <Board members={boardMembers()} />
      </div>
      <Header
        size="h2"
        text="Członkowie komisji rewizyjnej"
        sectionID="komisja-problemowa"
      />
      <div id="komisja-rewizyjna">
        <Board members={revisionComissionMembers()} />
      </div>
      <Header
        size="h2"
        text="Członkowie komisji problemowej"
        sectionID="komisja-problemowa"
      />
      <div id="komisja-problemowa">
        <Board members={problemComissionMembers()} />
      </div>
      <Header
        size="h2"
        text="Pracownicy pomocniczy"
        sectionID="pracownicy-pomocniczy"
      />
      <div id="pracownicy-pomocniczy" className={styles.last}>
        <Board members={additionalMembers()} />
      </div>
    </div>
  );
}

export default StructurePage;
