import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/components/containers/InputContainer.module.css';

/**
 * InputContainer Component
 *
 * Renders an input field with optional label and password visibility toggle.
 * Designed to be reusable and customizable with dynamic styling.
 */
const InputContainer = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
  placeholder,
  disabled = false,
  showToggle = false,
  isShown = false,
  onToggle,
}) => {
  // Determine the input type: 'password' or the provided type
  let inputType = type;
  if (showToggle && !isShown) {
    inputType = 'password';
  }

  // Determine the input field classes for styling purposes
  let inputClass = styles.input_field;
  if (showToggle) {
    inputClass += ` ${styles.password_input_field}`;
  }

  return (
    <div className={styles.input_container}>
      <h6 className={styles.input_label}>{label}</h6>

      <div className={showToggle ? styles.password_input_container : ''}>
        <input
          name={name}
          className={inputClass}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />

        {/* Render the toggle button only if 'showToggle' is enabled */}
        {showToggle && (
          <div className={styles.show_password_container}>
            <button onClick={onToggle} className={styles.show_password_button}>
              <FontAwesomeIcon icon={isShown ? faEyeSlash : faEye} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputContainer;
