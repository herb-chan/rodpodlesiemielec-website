// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import styles from '@styles/index.module.css';
// import feesstyles from '@styles/components/Fees.module.css';
// import Header from '@/components/typography/Header';
// import Adnotation from '@/components/alerts/Adnotation';
// import StaticFees from '@/components/containers/StaticFees';
// import PersonFees from '@/components/containers/PersonFees';

// function FeesPage() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Check if the user is logged in
//     const username = localStorage.getItem('username');

//     // Verify the existence of the user in the system
//     if (username && userData[username]) {
//       setUser(userData[username]);
//     }
//   }, []);

//   const handleLoginRedirect = () => {
//     router.push('/logowanie');
//   };

//   return (
//     <div className={styles.container}>
//       <Header size="h1" text="Opłaty" sectionID="ostatnie" />

//       {user ? (
//         <PersonFees user={user} />
//       ) : (
//         <div className={feesstyles.data_and_buttons}>
//           <Adnotation
//             type="error"
//             header="Nie jesteś zalogowany/-a!"
//             content="Zaloguj się, aby zobaczyć opłaty uwzględniające metraż działki oraz zużycie prądu. Na ten moment widzisz tylko opłaty stałe."
//           />
//           <StaticFees />
//           <div className={feesstyles.buttons}>
//             <button
//               className={`${feesstyles.button} ${feesstyles.edit}`}
//               onClick={handleLoginRedirect}>
//               <p>Jak się zalogować?</p>
//             </button>
//             <button className={feesstyles.button} onClick={handleLoginRedirect}>
//               <p>Zaloguj się</p>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FeesPage;
