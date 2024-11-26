import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/components/buttons/TabToggle.module.css'; // Add the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon

const TabToggle = ({ items, onSelect, selectedIndex }) => {
  const [selectedIndexState, setSelectedIndex] = useState(selectedIndex);

  // Sync the internal state with the controlled prop (selectedIndex) whenever it changes
  useEffect(() => {
    setSelectedIndex(selectedIndex);
    console.log(selectedIndex);
  }, [selectedIndex, selectedIndexState]); // Re-run when selectedIndex changes

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelect(index); // Call the function associated with the selected tab
  };

  return (
    <div
      className={styles.tab_container}
      style={{ '--tab-count': items.length }}>
      <div
        className={styles.tab_indicator}
        style={{
          width: `${100 / items.length}%`,
          transform: `translateX(${selectedIndexState * 100}%) ${selectedIndexState === items.length - 1 ? 'translateX(-4px)' : ''}`,
          '--left-offset': selectedIndexState === 0 ? '4px' : '0',
        }}
      />
      {items.map((item, index) => (
        <button
          key={index}
          className={`${styles.tab_item} ${selectedIndexState === index ? styles.active : ''}`}
          onClick={() => handleSelect(index)}>
          {item.icon && (
            <FontAwesomeIcon icon={item.icon} className={styles.icon} />
          )}
          {item.label}
        </button>
      ))}
    </div>
  );
};

TabToggle.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.object, // FontAwesomeIcon will be passed as an object
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number, // Make this prop optional, so it can be controlled externally
};

export default TabToggle;
