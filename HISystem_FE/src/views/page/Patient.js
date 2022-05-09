import MainHeader from 'components/Headers/MainHeader';
import PatientTable from 'components/patient/PatientTable';
import React from 'react';

const patient = () => {
    return (
        <div>
            <MainHeader />
            

            
            {/* 환자 List Table */}
            <PatientTable></PatientTable>
            

        </div>
    );
};

export default patient;