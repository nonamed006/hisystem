// import ChatRoomList from 'components/chat/ChatRoomList';
// import MainHeader from 'components/Headers/MainHeader';
// import ChatRoomModal from 'components/modal/public/ChatRoomModal';
import React from 'react';
// import { Button } from 'reactstrap';
import styled from 'styled-components';

import UserTable from 'components/employee/UserTable';
import MainHeader from 'components/Headers/MainHeader';

const TestChat = () => {
    var DivStyle = styled.div`
            position: absolute; 
            right: 1%; 
            bottom: 1%;

            //width: 100vw;
            //height: 100vh;
            //background: pink;
        `;

    return (
        <div>
            1
            {/* <MainHeader />
            <ChatRoomList></ChatRoomList>
                
            <DivStyle>
                <ChatRoomModal></ChatRoomModal>
            </DivStyle> */}

<MainHeader />
            
            {/* 유저 조회 */}
            <UserTable></UserTable>
        </div>
    );
};

export default TestChat;