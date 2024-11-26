// components/GateInfo.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCarSide,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/components/GateInfo.module.css';
import {
  daysOfWeekShort,
  gateHours,
  formatTimeLeft,
  getDayIndex,
  findNextOpenDay,
} from '@utils/dayInfoUtils';

function GateInfo() {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [gateClosingTime, setGateClosingTime] = useState('');
  const [nextGateOpenDate, setNextGateOpenDate] = useState('');
  const [showGateHours, setShowGateHours] = useState(false);

  const checkGateHours = () => {
    const now = new Date();
    const day = getDayIndex(now.getDay());
    const hour = now.getHours();

    const gateToday = gateHours[day];
    if (
      gateToday.open !== null &&
      hour >= gateToday.open &&
      hour < gateToday.close
    ) {
      setIsGateOpen(true);
      const closingTime = new Date();
      closingTime.setHours(gateToday.close, 0, 0);
      const timeLeft = Math.floor(
        (closingTime.getTime() - now.getTime()) / (1000 * 60)
      );
      setGateClosingTime(formatTimeLeft(timeLeft));
    } else {
      setIsGateOpen(false);
      const nextOpenDay = findNextOpenDay(gateHours);
      setNextGateOpenDate(
        nextOpenDay !== null
          ? `${daysOfWeekShort[nextOpenDay]}, ${gateHours[nextOpenDay].open}:00`
          : 'Brama nie będzie otwarta w najbliższym czasie'
      );
    }
  };

  useEffect(() => {
    checkGateHours();
    const interval = setInterval(checkGateHours, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          <FontAwesomeIcon icon={faCarSide} /> Brama:
        </h3>
      </div>
      <div>
        <button
          onClick={() => setShowGateHours(!showGateHours)}
          className={styles.button}>
          <div className={styles.info}>
            <p>
              <span className={isGateOpen ? styles.open : styles.closed}>
                {isGateOpen ? 'Otwarta' : 'Zamknięta'}
              </span>{' '}
              • {!isGateOpen && <>Otwarcie: {nextGateOpenDate}</>}
              {isGateOpen && <>{gateClosingTime} do zamknięcia</>}
            </p>
            <p>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`${styles.caretIcon} ${
                  showGateHours ? styles.rotate : ''
                }`}
              />
            </p>
          </div>
        </button>
        <div className={`${styles.hours} ${showGateHours ? styles.show : ''}`}>
          {gateHours.map((entry, idx) => (
            <div key={idx}>
              <span className={styles.day_name}>{entry.day}:</span>{' '}
              {entry.open !== null
                ? `${entry.open}:00 - ${entry.close}:00`
                : 'Zamknięte'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GateInfo;
