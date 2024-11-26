import React from 'react';
import feesstyles from '@styles/components/StaticFees.module.css';
import About from '../buttons/About';

const StaticFees = () => {
  return (
    <div className={feesstyles.data_container}>
      <h2>Opłaty stałe:</h2>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Opłata ogrodowa</h4>
          <About content="Opłata ogrodowa obejmuje koszty utrzymania ogrodu, takie jak koszenie trawy, przycinanie drzew i krzewów, oraz inne prace związane z pielęgnacją wspólnych terenów." />
        </div>
        <p>0,90 zł</p>
      </div>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Składka członkowska</h4>
          <About content="Składka członkowska to obowiązkowa opłata dla każdego członka ogrodu, która przeznaczana jest na działania organizacyjne i administracyjne." />
        </div>
        <p>6,00 zł</p>
      </div>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Opłata licznikowa</h4>
          <About content="Opłata licznikowa to opłata za zużycie energii elektrycznej w obrębie działki, mierzone za pomocą licznika." />
        </div>
        <p>25,00 zł</p>
      </div>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Wywóz odpadów</h4>
          <About content="Opłata za wywóz odpadów obejmuje koszt regularnego odbioru i utylizacji odpadów z terenu działek." />
        </div>
        <p>60,00 zł</p>
      </div>
    </div>
  );
};

export default StaticFees;
