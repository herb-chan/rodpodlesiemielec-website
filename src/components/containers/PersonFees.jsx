import React from 'react';
import feesstyles from '@styles/components/PersonFees.module.css';
import About from '../buttons/About';

const PersonFees = ({ user }) => {
  return (
    <div className={feesstyles.data_container}>
      <h2>Opłaty użytkownika:</h2>
      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Powierzchnia działki</h4>
          <About content="Opłata za powierzchnię działki, która jest obliczana na podstawie wielkości działki." />
        </div>
        <p>{user.fees.area.toFixed(2)} zł</p>
      </div>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Składka członkowska</h4>
          <About content="Składka członkowska to opłata dla członków ogrodu, która wspiera działania organizacyjne." />
        </div>
        <p>{user.fees.membership.toFixed(2)} zł</p>
      </div>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Opłata licznikowa</h4>
          <About content="Opłata licznikowa za zużycie energii elektrycznej, obliczana na podstawie wskazań licznika." />
        </div>
        <p>{user.fees.meter.toFixed(2)} zł</p>
      </div>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Wywóz odpadów</h4>
          <About content="Opłata za wywóz odpadów, obejmująca regularny odbiór śmieci z terenu działek." />
        </div>
        <p>{user.fees.waste.toFixed(2)} zł</p>
      </div>

      <div className={feesstyles.fee_data_field}>
        <div className={feesstyles.fee_data_field_header}>
          <h4>Opłata roczna</h4>
          <About content="Opłata roczna, która obejmuje wszystkie koszty związane z utrzymaniem ogrodu i działki." />
        </div>
        <p>{user.fees.annual_fee.toFixed(2)} zł</p>
      </div>
    </div>
  );
};

export default PersonFees;
