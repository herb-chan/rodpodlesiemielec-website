import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/components/Copy.module.css';
import { faClone } from '@fortawesome/free-solid-svg-icons';

const Copy = ({ thing }) => {
  const [copied, setCopied] = useState(false);
  const [accentColor, setAccentColor] = useState('');

  useEffect(() => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-color')
      .trim();
    setAccentColor(color);
  }, []); // Runs once after the component mounts

  const handleCopy = () => {
    // Check if navigator.clipboard is available
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(thing)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    } else {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(thing);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Prevent keyboard from showing on mobile
    textArea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <button onClick={handleCopy} className={styles.button}>
      <FontAwesomeIcon
        icon={faClone}
        className={styles.icon}
        style={{ color: copied ? accentColor : 'inherit' }} // Change color based on copied state
      />
    </button>
  );
};

export default Copy;
