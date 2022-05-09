import { Stomp } from '@stomp/stompjs';
import DiagnosisTable from 'components/diagnosis/DiagnosisTable';
import MainHeader from 'components/Headers/MainHeader';
import { Col, Row } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

const diagnosis = () => {

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [conn, setConn] = useState({});

	var socketConn = () => {
		var sockJs = new SockJS('http://localhost:8081/stomp/connect');
		var stomp = Stomp.over(sockJs);

		// 2. connection이 맺어지면 실행
		stomp.connect({}, function () {
			console.log('### STOMP Connection ###');
			stomp.subscribe(`/sub/chat/room/alarm`, function (chat) {});
		});
		return stomp;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
    setConn({stomp: socketConn()});
  }, []);

	var sendAlarm = (userNo, patientNo, patientName, message) => {
    conn.stomp.send('/pub/chat/alarm', {}, JSON.stringify({ userNo: userNo, patientNo: patientNo, patientName: patientName, message: message, type: 2 }));
  }

	return (
		<div>
			<MainHeader />
			<Row>
				<Col xl='12'>
					<DiagnosisTable sendAlarm={sendAlarm}></DiagnosisTable>
				</Col>
			</Row>

		</div>
	);
};

export default diagnosis;