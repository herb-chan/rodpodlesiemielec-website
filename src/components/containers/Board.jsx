import React from 'react';
import Member from './Member';
import styles from '@styles/components/Board.module.css';

const Board = ({ members }) => {
  return (
    <div className={styles.grid}>
      {members.map((member, index) => (
        <Member
          key={index}
          member={member.name}
          member_function={member.role}
          role={member.role}
          number={member.phone || 'Brak telefonu'}
        />
      ))}
    </div>
  );
};

export default Board;
