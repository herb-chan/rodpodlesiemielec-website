import React, { useState } from 'react';
import styles from '@styles/components/ContactForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiryType: 'Finanse',
  });
  const [errors, setErrors] = useState({});
  const [confirmedFields, setConfirmedFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    setConfirmedFields((prevConfirmed) => ({
      ...prevConfirmed,
      [name]: !error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const subject = encodeURIComponent(
        `New Inquiry: ${formData.inquiryType}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:rodpodlesiemielec@pzd.pl?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const validateField = (name, value) => {
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Invalid email format';
      }
    }
    return '';
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {['name', 'email'].map((field) => (
          <div className={styles.form_group} key={field}>
            <h5 className={styles.input_label}>
              {field === 'email' ? 'Email:' : 'Imię:'}
            </h5>
            <div className={styles.input_container}>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field === 'email' ? 'Email...' : 'Imię...'}
                className={`${styles.input_field} ${
                  errors[field]
                    ? styles.input_error
                    : confirmedFields[field]
                      ? styles.input_confirmed
                      : ''
                }`}
              />
              <div className={styles.input_validation}>
                {errors[field] && (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.iconError}
                  />
                )}
                {confirmedFields[field] && !errors[field] && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.iconConfirmed}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <div className={styles.form_group}>
          <h5 className={styles.input_label}>Temat wiadomości:</h5>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className={`${styles.input_field} ${styles.inquiry_type}`}>
            <option value="Finanse">Finanse</option>
            <option value="Administracja">Administracja</option>
            <option value="Prawo">Prawo</option>
            <option value="Zgłoszenie">Zgłoszenie</option>
            <option value="Inne">Inne</option>
          </select>
        </div>

        <div className={styles.form_group}>
          <h5 className={styles.input_label}>Treść wiadomości:</h5>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Wiadomość..."
            className={`${styles.input_field} ${styles.message_field} ${
              errors.message
                ? styles.input_error
                : confirmedFields.message
                  ? styles.input_confirmed
                  : ''
            }`}
          />
        </div>

        <button type="submit" className={styles.submit_button}>
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
