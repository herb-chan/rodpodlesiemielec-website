import React from 'react';
import styles from '@styles/components/Contact.module.css';
import Header from '@/components/typography/Header';
import DayInfo from '@/components/containers/DayInfo';
import ContactInformations from '@/components/containers/ContactInformations';
import ContactForm from '@/components/containers/ContactForm';

function Contact() {
  return (
    <div className={styles.container}>
      <Header size="h1" text="Kontakt" sectionID="kontakt" />

      <div className={styles.block} id="informacje-kontaktowe">
        <Header
          size="h2"
          text="Informacje kontaktowe"
          sectionID="informacje-kontaktowe"
        />
        <ContactInformations />
      </div>

      <div className={styles.block} id="godziny-otwarcia">
        <Header
          size="h2"
          text="Godziny otwarcia"
          sectionID="godziny-otwarcia"
        />
        <DayInfo />
      </div>

      <div className={styles.block} id="skontaktuj-sie-z-nami">
        <Header
          size="h2"
          text="Skontaktuj się z nami"
          sectionID="skontaktuj-sie-z-nami"
        />
        <ContactForm />
      </div>

      {/* Map and Directions */}
      <div className={styles.block} id="mapa">
        <Header size="h2" text="Mapa" sectionID="mapa" />
        <div className={styles.map_container}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1011.3409823752482!2d21.473289237999605!3d50.302762134866924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d6bf0f779ddd5%3A0xcf2883a2788d0330!2zT2dyw7Nka2kgRHppYcWCa293ZQ!5e0!3m2!1spl!2spl!4v1729972242590!5m2!1spl!2spl"
            width="100%"
            height="600"
            allowFullScreen=""
            loading="lazy"
            title="Map to ROD Podlesie"></iframe>
          <p>
            Rodzinne Ogrody Działkowe &quot;PODLESIE&quot; znajdują się na ulicy
            Partyzantów 17, 39-300 Mielec
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
