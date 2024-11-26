import '@styles/globals.css';
import styles from '@styles/_app.module.css';
import { useRouter } from 'next/router';
import Sidebar from '@/components/navbars/Sidebar';
import {
  faHouse,
  faClipboard,
  faUsers,
  faCashRegister,
  faUser,
  faEnvelope,
  faImage,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

function App({ Component, pageProps }) {
  const router = useRouter();

  const menuItems = [
    // Ogólne
    { label: 'Strona główna', link: '/', icon: faHouse },
    { label: 'Aktualności', link: '/aktualnosci/1', icon: faClipboard },
    { label: 'Galeria', link: '/galeria', icon: faImage },
    { label: 'Tablica ogłoszeń', link: '/tablica', icon: faThumbTack },

    // Dokumenty i Opłaty
    { label: 'Druki', link: '/druki', icon: faClipboard },
    { label: 'Opłaty', link: '/oplaty', icon: faCashRegister },

    // Informacje o ROD
    { label: 'Struktura ROD', link: '/struktura', icon: faUsers },
    { label: 'Profil działkowca', link: '/profil', icon: faUser },

    // Kontakt
    { label: 'Kontakt', link: '/kontakt', icon: faEnvelope },
  ];

  // Navigation handler for sidebar buttons
  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Ogrody Działkowe &quot;PODLESIE&quot; w Mielcu</title>
        <meta name="title" content='Ogrody Działkowe "PODLESIE" w Mielcu' />
        <meta
          name="description"
          content='Rodzinne Ogrody Działkowe "PODLESIE" w Mielcu - oferujące relaks wśród natury. Sprawdź aktualności, porady ogrodnicze i galerię zdjęć z życia działkowców.'
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://rodpodlesiemielec.pl/" />
        <meta
          property="og:title"
          content='Ogrody Działkowe "PODLESIE" w Mielcu'
        />
        <meta
          property="og:description"
          content='Rodzinne Ogrody Działkowe "PODLESIE" w Mielcu - oferujące relaks wśród natury. Sprawdź aktualności, porady ogrodnicze i galerię zdjęć z życia działkowców.'
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://rodpodlesiemielec.pl/" />
        <meta
          property="twitter:title"
          content='Ogrody Działkowe "PODLESIE" w Mielcu'
        />
        <meta
          property="twitter:description"
          content='Rodzinne Ogrody Działkowe "PODLESIE" w Mielcu - oferujące relaks wśród natury. Sprawdź aktualności, porady ogrodnicze i galerię zdjęć z życia działkowców.'
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />
      </Head>
      <div className={styles.app}>
        <div className={styles.sidebar_container}>
          <Sidebar onMenuItemClick={handleNavigation} />
        </div>
        <div className={styles.content_container}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
