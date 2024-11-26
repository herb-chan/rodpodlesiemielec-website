import React from 'react';
import styles from '@styles/components/Header.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParagraph } from '@fortawesome/free-solid-svg-icons';

const Header = ({ size, text, sectionID }) => {
  const Tag = size;

  return (
    <div className={styles.container}>
      <Tag id={sectionID}>{text}</Tag>
      <a
        className={styles.headerlink}
        href={`#${sectionID}`}
        aria-label={`Jump to section ${text}`}>
        <FontAwesomeIcon icon={faParagraph} />
      </a>
    </div>
  );
};

Header.propTypes = {
  size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  text: PropTypes.string.isRequired,
  sectionID: PropTypes.string.isRequired,
};

export default Header;
