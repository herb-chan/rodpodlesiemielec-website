import React, { useState } from 'react';
import styles from '@styles/components/Member.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Copy from '../buttons/Copy';
import { getBoardMemberIcon } from '@/utils/member';

const Member = ({ member, member_function, role, number }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={getBoardMemberIcon(role)}
        className={styles.icon}
      />
      <div className={styles.details_container}>
        <h2>{member}</h2>
        <p>{member_function}</p>
      </div>
      <p className={styles.phone_number}>
        tel. {number}{' '}
        {number !== 'Brak telefonu' ? <Copy thing={number} /> : ''}
      </p>
    </div>
  );
};

export default Member;
