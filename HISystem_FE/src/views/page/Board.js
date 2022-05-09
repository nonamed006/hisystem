import BoardTable from 'components/board/BoardTable';
import MainHeader from 'components/Headers/MainHeader';
import React from 'react';

const patient = () => {
    return (
        <div>
            <MainHeader />
            
            {/* 유저 조회 */}
            <BoardTable></BoardTable>
            

        </div>
    );
};

export default patient;