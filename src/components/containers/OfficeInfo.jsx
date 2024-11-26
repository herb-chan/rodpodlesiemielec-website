import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/components/OfficeInfo.module.css';
import {
  daysOfWeekShort,
  officeHours,
  formatTimeLeft,
  getDayIndex,
  findNextOpenDay,
} from '@utils/dayInfoUtils';

function OfficeInfo() {
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);
  const [officeClosingTime, setOfficeClosingTime] = useState('');
  const [nextOfficeOpenDate, setNextOfficeOpenDate] = useState('');
  const [showOfficeHours, setShowOfficeHours] = useState(false);

  const checkOfficeHours = () => {
    const now = new Date();
    const day = getDayIndex(now.getDay());
    const hour = now.getHours();

    const officeToday = officeHours[day];
    if (
      officeToday.open !== null &&
      hour >= officeToday.open &&
      hour < officeToday.close
    ) {
      setIsOfficeOpen(true);
      const closingTime = new Date();
      closingTime.setHours(officeToday.close, 0, 0);
      const timeLeft = Math.floor(
        (closingTime.getTime() - now.getTime()) / (1000 * 60)
      );
      setOfficeClosingTime(formatTimeLeft(timeLeft));
    } else {
      setIsOfficeOpen(false);
      const nextOpenDay = findNextOpenDay(officeHours);
      setNextOfficeOpenDate(
        nextOpenDay !== null
          ? `${daysOfWeekShort[nextOpenDay]}, ${officeHours[nextOpenDay].open}:00`
          : 'Budynek nie będzie otwarty w najbliższym czasie'
      );
    }
  };

  useEffect(() => {
    checkOfficeHours();
    const interval = setInterval(checkOfficeHours, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          <FontAwesomeIcon icon={faShop} /> Budynek zarządu:
        </h3>
      </div>
      <div>
        <button
          onClick={() => setShowOfficeHours(!showOfficeHours)}
          className={styles.button}>
          <div className={styles.info}>
            <p>
              <span className={isOfficeOpen ? styles.open : styles.closed}>
                {isOfficeOpen ? 'Otwarty' : 'Zamknięty'}
              </span>{' '}
              • {!isOfficeOpen && <>Otwarcie: {nextOfficeOpenDate}</>}
              {isOfficeOpen && <>{officeClosingTime} do zamknięcia</>}
            </p>
            <p>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`${styles.caretIcon} ${
                  showOfficeHours ? styles.rotate : ''
                }`}
              />
            </p>
          </div>
        </button>
        <div
          className={`${styles.hours} ${showOfficeHours ? styles.show : ''}`}>
          {officeHours.map((entry, idx) => (
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

export default OfficeInfo;
