import { Stomp } from '@stomp/stompjs';
import MainHeader from 'components/Headers/MainHeader';
import ReceiptTable from 'components/receipt/ReceiptTable';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import styled from 'styled-components';

// const DivStyle = styled.div`
//   position: absolute;
//   height: 50px; 
//   width: 700px;
//   top: 20px; 
//   left: 20%;
//   background-color: #FC7C5F;
//   border-radius: 10px;

//   text-align: center;
//   padding: 10px;
//   font-weight: bolder;
//   color: white;
// `;


const Receipt = () => {

  const [conn, setConn] = useState({});
  // const [alarmInfo, setAlarmInfo] = useState({
  //   state : false,
  //   message: ''
  // });
  var user;

  var socketConn = () => {
    var sockJs = new SockJS('http://localhost:8081/stomp/connect');
    var stomp = Stomp.over(sockJs);

    // 2. connection이 맺어지면 실행
    stomp.connect({}, function () {
      console.log('### STOMP Connection ###');

      stomp.subscribe(`/sub/chat/room/alarm`, function (chat) {
        var content = JSON.parse(chat.body); // userNo, patientNo, patientName, message
          //console.log(user);
          //if(user.no == content.userNo){
            // setAlarmInfo({
            //   state : true,
            //   message: content.patientName + '님 ' + content.message
            // });
            // setTimeout(() => setAlarmInfo({
            //   state : false,
            //   message: ''
            // }), 3000);
          //}
      });
    });
    return stomp;
  }

  useEffect(() => {
    fetch("http://localhost:8081/user", {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("Authorization")
      }
    }).then((res) => res.json())
      .then((res) => {
        setConn({
          //user: res,
          stomp: socketConn()
        });
        user = res;
      });
  }, []);

  var sendAlarm = (userNo, patientNo, patientName, message) => {
    conn.stomp.send('/pub/chat/alarm', {}, JSON.stringify({ userNo: userNo, patientNo: patientNo, patientName: patientName, message: message, type: 1 }));
  }

  return (
    <>
      <MainHeader></MainHeader>
      <ReceiptTable sendAlarm={sendAlarm}></ReceiptTable>
      {/* { alarmInfo.state ? <DivStyle>{alarmInfo.message}</DivStyle> : null } */}
    </>
  );
};

export default Receipt;