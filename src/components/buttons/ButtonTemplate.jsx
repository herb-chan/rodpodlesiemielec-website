// ButtonTemplate.jsx
import React from 'react';
import styles from '@styles/components/buttons/ButtonTemplate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonTemplate = ({
  text,
  icon,
  textPosition = 'center',
  variant = 'text',
  type = 'neutral',
  size = 'medium2',
  onClick,
}) => {
  const getTextPositionClass = () => {
    switch (textPosition) {
      case 'left':
        return styles.left_button;
      case 'right':
        return styles.right_button;
      default:
        return styles.center_button;
    }
  };

  const getButtonClass = () => {
    switch (variant) {
      case 'icon':
        return styles.icon_button;
      case 'borderless_text_icon':
        return styles.borderless_text_icon;
      case 'borderless_icon':
        return styles.borderless_icon;
      case 'text_icon':
        return styles.text_icon;
      case 'border_text':
        return styles.border_text;
      case 'border_text_icon':
        return styles.border_text_icon;
      case 'border_icon':
        return styles.border_icon;
      default:
        return styles.text_button;
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'information':
        return styles.information;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'success':
        return styles.success;
      default:
        return styles.neutral;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return styles.size_small;
      case 'small2':
        return styles.size_small2;
      case 'medium':
        return styles.size_medium;
      case 'large':
        return styles.size_large;
      case 'large2':
        return styles.size_large2;
      default:
        return styles.size_medium2;
    }
  };

  return (
    <button
      className={`${styles.button} ${getTextPositionClass()} ${getButtonClass()} ${getTypeClass()} ${getSizeClass()}`}
      onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default ButtonTemplate;
