// import KandanBoard from 'components/main/KandanBoard';
import MainHeader from 'components/Headers/MainHeader';
import React from 'react';
import UserTable from 'components/employee/UserTable';
const patient = () => {
    return (
        <div>
            <MainHeader />
            
            {/* ์ ์  ์กฐํ */}
            {/* <KandanBoard></KandanBoard> */}
            <UserTable></UserTable>

        </div>
    );
};

export default patient;