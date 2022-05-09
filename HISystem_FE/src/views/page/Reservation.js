import MainHeader from 'components/Headers/MainHeader';
import ReservationTable from 'components/reservation/ReservationTable';
import React from 'react';

const Reservation = () => {
    return (
        <>
          <MainHeader></MainHeader>
          <ReservationTable></ReservationTable>
        </>
    );
};

export default Reservation;