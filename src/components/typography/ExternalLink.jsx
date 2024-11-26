import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/components/ExternalLink.module.css';

const ExternalLink = ({ link_display_text, link_redirect, is_in_new_card }) => {
  return (
    <a
      className={styles.link}
      href={link_redirect}
      target={is_in_new_card ? '_blank' : '_self'}
      rel="noopener noreferrer">
      {link_display_text} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </a>
  );
};

export default ExternalLink;
