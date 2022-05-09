/*eslint-disable*/
import { Button, Row, Table, Input } from 'reactstrap';
import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Container, Col, Modal } from 'react-bootstrap';
import ChatRoom from 'components/chat/ChatRoom';
import SendMsg from 'components/chat/SendMsg';
import ReceiveMsg from 'components/chat/ReceiveMsg';
import styled from 'styled-components';
import Friend from 'components/chat/Friend';

const DivStyle = styled.div`
  height: 620px;
`;
const DivStyle2 = styled.div`
  height: 250px;
  overflow: auto;
`;
const DivStyle3 = styled.div`
  height: 450px;
	//width: 100%;
  overflow: auto;
`;
const Trstyle = styled.tr`
  cursor: pointer;
`;
const A = styled.div`
  width: 400px;
  padding: 10px 10px 10px 10px ;
`;
const DivStyle0 = styled.div`
  position: absolute;
  height: 95px; 
  width: 230px;
  top: -150px; 
  left: 10px;
  border: 2px solid #74b816;
  /border-bottom: 3px solid #087f5b;
  background-color: #d8f5a2;
  border-radius: 5px;

  /text-align: ;
  padding: 10px 20px 10px 20px;
  font-weight: bolder;
  color: black;
`;

const Divstyle5 = styled.div`
text-align: center;
`
;

const DivSize = styled.div`
	font-size: 5px;
`;


function ChatRoomModal(props) {
	// ##### ##### Modal ##### #####
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// ##### ##### Modal ##### #####
	// ########## ########## ########## STATE ########## ########## ##########
	// ########## ########## ########## STATE ########## ########## ##########

	const [alarmInfo, setAlarmInfo] = useState({
		state: false,
		message: ''
	});
	const [reload, setReload] = useState(false);					// useEffect 재실행
	//const [user, setUser] = useState({});           			// 로그인 한 유저 정보 (나 자신)

	const { user, isFirst, setIsFirst } = props;
	/*	메시지가 도착하면 message state가 변하는데 그럼 다른 방에서 메시지가 와도 현재 채팅방 내용이 변하기 때문에
			메시지 도착에 의해 message state가 변할 경우에 useEffect를 불러서 다시 로드 해 준다 => 그때 사용할 state */
	const [t, setT] = useState(0);

	const [userList, setUserList] = useState([]);         // 모든 유저 정보
	const [chatRoom, setchatRoom] = useState([]);   			// 로그인 한 유저가 속한 채팅방 정보
	const [message, setMessage] = useState([]);						// 채팅방 안에서 보이는 메시지
	const [inputMessage, setInputMessage] = useState(''); // 채팅방 안에서 입력하는 메시지 입력 값
	const [nowChatRoomNo, setNowChatRoomNo] = useState(0);// 현재 선택된 채팅방
	const [conn, setConn] = useState({});									// 소켓 연결
	// 화면 전환용
	const [friendsOrChatList, setFriendsOrChatList]
		= useState({ status: 1, view: true });  						// 1: 친구 / 2: 채팅방 / 3: 새 채팅방 만들기
	const [contents, setContents] = useState(1);  				// 1: 채팅방 리스트 / 2: 채팅방 안 
	// ########## ########## ########## STATE ########## ########## ##########
	// ########## ########## ########## STATE ########## ########## ##########

	// ########## ########## ########## MESSAGE ########## ########## ##########
	// ########## ########## ########## MESSAGE ########## ########## ##########
	/*	전체 채팅방 조회 => 채팅방 이름, 최근 메시지(시간), 안 읽은 메시지 수
				1. useEffect에서 실행[로그인 한 유저 no를 받아와야 해서] 
			2. 메시지 오면 실행 해야함[밖의 채팅방 상황 최산화를 위해]
	*/
	var getChatList = (userNo, isUseEffect) => {
		fetch(`http://localhost:8081/chat/rooms/${userNo}`, {
			method: "get",
		}).then((res) => res.json())
			.then((res) => {
				setchatRoom(res);
				if (isUseEffect) setConn({ stomp: socketConn(res) });
			});
	};
	/*	채팅방 번호로 채팅 내용 불러오기 
			1. 메시지 받을 때 마다
			2. 채팅방 들어갈 때
	*/
	var getMessageFromDB = (chatRoomNo, isCallback) => {
		fetch(`http://localhost:8081/chat/room/message/${chatRoomNo}`, {
			method: "get",
		}).then((res) => res.json())
			.then((res) => {
				setMessage(res);
				console.log(res);
				/*setTimeout(() => {
					const { scrollHeight, clientHeight } = scrollRef.current;
					scrollRef.current.scrollTop = scrollHeight - clientHeight;
				}, 1000);*/
				try {
					scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
				} catch (error) {
					console.log(error);
				}
			});
	};
	// 메시지 전송 함수
	var sendMessage = (msg, nowChatRoomNo) => {
		conn.stomp.send('/pub/chat/message', {}, JSON.stringify({ chatRoom_no: nowChatRoomNo, msg: msg, send_user_no: user.no }));
		setInputMessage('');
	}
	// 메시지 입력 핸들러
	const inputMessageHandler = (e) => {
		e.preventDefault();
		setInputMessage(e.target.value);
	};
	// 메시지 엔터키 이벤트
	function msgEnterkey(e) {
		e.preventDefault();
		if (window.event.keyCode == 13) { // 메시지 보내기
			sendMessage(inputMessage, nowChatRoomNo);
		}
	}
	// ########## ########## ########## MESSAGE ########## ########## ##########
	// ########## ########## ########## MESSAGE ########## ########## ##########

	// ########## ########## ########## 주요 로직 ########## ########## ##########
	// ########## ########## ########## 주요 로직 ########## ########## ##########
	useEffect(() => {
		// 이걸 착신 콜백에서 한 번만 실행하도록 만들어야 해
		if (!isFirst) getMessageFromDB(nowChatRoomNo);

		if (user.no >= 1 && isFirst) {
			setIsFirst(false);
			getUserList();
			getChatList(user.no, true);// userNo로 해당 유저의 채팅방 조회
		}
	}, [user, t]);

	var socketConn = (chatRoomList) => {
		var sockJs = new SockJS('http://localhost:8081/stomp/connect');
		var stomp = Stomp.over(sockJs);

		// 2. connection이 맺어지면 실행
		stomp.connect({}, function () {
			console.log('### STOMP Connection ###');
			console.log(user);

			for (var i = 0; i < chatRoomList.length; i++) {
				stomp.subscribe(`/sub/chat/room/${chatRoomList[i].roomNo}`, function (chat) {
					var content = JSON.parse(chat.body);
					getMessageFromDB(content.chatRoom_no);
					getChatList(user.no);
					setT(Math.random());

					setAlarmInfo({
						state: true,
						sender: content.send_user_no,
						message: content.msg
					});
					setTimeout(() => setAlarmInfo({
						state: false,
						message: ''
					}), 5000);

				});
			}

			//stomp.subscribe(`/sub/chat/room/1`, function (chat) {
			//var content = JSON.parse(chat.body);
			//	getMessageFromDB(nowChatRoomNo);
			//});

			stomp.subscribe(`/sub/chat/room/alarm`, function (chat) {
				var content = JSON.parse(chat.body); // userNo, patientNo, patientName, message
				//console.log(user);
				if (content.type == 1) {
					if (user.no == content.userNo) {
						setAlarmInfo({
							state: true,
							message: content.patientName + '님 ' + content.message
						});
						setTimeout(() => setAlarmInfo({
							state: false,
							message: ''
						}), 5000);
					}
				}else if((content.type == 2)){
					if (user.role == 1) {
						setAlarmInfo({
							state: true,
							message: content.patientName + '님 ' + content.message
						});
						setTimeout(() => setAlarmInfo({
							state: false,
							message: ''
						}), 7000);
					}
				}else if((content.type == 3)){
					if (user.no == content.userNo) {
						setAlarmInfo({
							state: true,
							message: content.message + ' 1분전 입니다 '
						});
						setTimeout(() => setAlarmInfo({
							state: false,
							message: ''
						}), 7000);
					}
				}else{
					if (true) {
						setAlarmInfo({
							state: true,
							message: '새로운 비대면 접수 등록'
						});
						setTimeout(() => setAlarmInfo({
							state: false,
							message: ''
						}), 7000);
					}
				}
			});

		});

		stomp.onWebSocketClose = () => {
			alert('끊어짐');
		}
		return stomp;
	}
	/*	친구목록에 보여줄 유저 정보 받아오기
			useEffect에서 한 번만 실행하면 됨
			on/off 실시간 변경 하려면 로그인시 알림 주고 그 알림 받으면 이 함수 실행해야 할듯
	 */
	var getUserList = () => {
		fetch("http://localhost:8081/user/list", { // 유저정보 받아오기
			method: "get",
			headers: {
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then((res) => res.json())
			.then((res) => {
				setUserList(res);
			});
	}
	// ########## ########## ########## 주요 로직 ########## ########## ##########
	const scrollRef = useRef();
	var mainContents = () => {
		if (contents == 1) {
			return <DivStyle3>
				{chatRoom.map(function (res, index) {
					return <div>
						<ChatRoom key={index} clickEvent={() => {
							setContents(2);
							setFriendsOrChatList({ status: 2, view: false });
							getMessageFromDB(res.roomNo);
							setNowChatRoomNo(res.roomNo);
						}} title={res.roomName} contents={res.msg} time={res.time} count={res.count} ></ChatRoom>
					</div>
				})}
			</DivStyle3>
		}
		if (contents == 2) {
			return <>
				<DivStyle3 ref={scrollRef}>
					<A>
						<Row>
							{true ? message.map((res, index) => {
								if (res?.receive_user_no == user.no) {
									return <>
										{
											user.no != res.send_user_no ?
												<>{/* 내가 받은 거 */}
													<Col xl='6'> <ReceiveMsg key={index} msg={res.msg} time={res.reg_date.substring(5, 16)} count={/*res.read_yn == 'Y'*/ true ? null : '1'} name={findUserName(res.send_user_no)}></ReceiveMsg> </Col>
													<Col xl='6'> </Col>
												</>
												:
												<>{/* 내가 보낸 거 */}
													<Col xl='6'> </Col>
													<Col xl='6'> <SendMsg key={index} msg={res.msg} time={res.reg_date.substring(5, 16)} count={/*res.read_yn == 'Y'*/ true ? null : '1'}></SendMsg> </Col>
												</>
										}
									</>
								}
							}) : null }
						</Row>
					</A>
				</DivStyle3>
				<Row>
					<Col xl='12'>
						<br />
						<Input
							id="textarea"
							rows="1"
							placeholder="message"
							value={inputMessage}
							onChange={inputMessageHandler}
							onKeyUp={(e) => msgEnterkey(e)}
						/>
					</Col>
					{/* <input
						placeholder="message"
						type="text"
						value={inputMessage}
						onChange={inputMessageHandler}
						onKeyUp={(e) => msgEnterkey(e)}
					/> */}
				</Row>
			</>
		}
	}



	var mainContents2 = () => {
		return <DivStyle3>
			{userList.map((res, index) => {
				if (res.no != user.no)
					return <Friend key={index} setNowChatRoomNo={setNowChatRoomNo} getChatList={getChatList} sendMessage={sendMessage} setNowChatRoomNo={setNowChatRoomNo} getMessageFromDB={getMessageFromDB} setContents={setContents} setFriendsOrChatList={setFriendsOrChatList} res={res} me={user}></Friend>
			})}
		</DivStyle3>
	}

	// ##### ##### ##### ##### ##### 텝3 ##### ##### ##### ##### ##### 
	// ##### ##### ##### ##### ##### 텝3 ##### ##### ##### ##### ##### 

	const tableTitle = ['이름', '직무', '성별', '나이']; // 테이블 헤더
	var roleToString = (role) => {
		if (role == 1) return '원무과';
		if (role == 2) return '간호사';
		if (role == 3) return '수간호사';
		if (role == 4) return '의사';
		if (role == 9) return '관리자';
		return '개발자';
	}
	var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));
	const [inputValues, setInputValues] = useState({	// 입력창 3개
		inputName: '',
		inputChattingRoomName: '',
		inputMessage: ''
	});
	const [inputNameList, setInputNameList] = useState([]);	// 초대할 사람 리스트
	// 검색 입력
	var inputSearch = (e, type) => {
		type == 1 ? setInputValues({
			...inputValues,
			inputName: e.target.value
		})
			: setInputValues({
				...inputValues,
				inputChattingRoomName: e.target.value
			});
	};
	// 검색 엔터키 이벤트
	var enterkey = (e) => {
		e.preventDefault();
		if (window.event.keyCode == 13) {
			var selectedUser = null;
			var cnt = 0;
			userList.map((res) => {
				if (res.name.indexOf(e.target.value) != -1) { // 검색 결과가 있으면 
					cnt++;
					selectedUser = res;
				};
			});
			if (cnt > 1) alert('아래에서 선택해주세요');
			if (cnt == 1) setInputNameList([...inputNameList, { name: selectedUser.name, no: selectedUser.no }]);
			if (cnt == 0) alert('결과가 없습니다');
			// const set = new Set(inputNameList);
			// setInputNameList([...set]);
		}

	}
	var mainContents3 = () => {
		return <Row>
			<Col xl='5'>
				<Input
					placeholder="이름을 입력하세요"
					type="text"
					value={inputValues.inputName}
					onChange={(e) => inputSearch(e, 1)}
					onKeyUp={(e) => enterkey(e)}
				/>
			</Col>
			<Col xl='7'>
				<Input
					placeholder="채팅방 이름을 입력하세요"
					type="text"
					value={inputValues.inputChattingRoomName}
					onChange={(e) => inputSearch(e)}
				/>
				<br />
			</Col>
			<Col xl='12'>
				<DivStyle2>
					<Table className="align-items-center table-flush" responsive>
						<thead className="thead-light">
							<tr>
								{tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
								<th scope="col" />
							</tr>
						</thead>
						<tbody>
							{userList.map((res, index) => {
								if (res.name.indexOf(inputValues.inputName) != -1) {
									return <Trstyle onClick={() => {
										setInputNameList([
											...inputNameList, {
												name: res.name,
												no: res.no
											}]);
									}}>
										<td>{res.name}</td>
										<td>{roleToString(res.role)}</td>
										<td>{res.gender == 'M' ? '남자' : '여자'}</td>
										<td>{ssnToAge(res.ssn)}</td>
										<td />
									</Trstyle>
								}
							})}
						</tbody>
					</Table>
				</DivStyle2>
			</Col>
			<Col xl='12'><br /></Col>
			<Col xl='12'>
				<Input
					id="textarea"
					placeholder="Please enter your message ..."
					rows="2"
					type="textarea"
					value={inputValues.inputMessage}
					onChange={(e) => setInputValues({ ...inputValues, inputMessage: e.target.value })}
				/>
			</Col>
			<Col xl='12'><br /></Col>
			<Col xl='10'>
				{inputNameList?.map((res) => {
					return <span><b>{res.name}&nbsp;&nbsp;</b></span>
				})} <br /> <span>에게 메시지를 전송합니다</span>
			</Col>
			<Col xl='2'>
				<Button color="success" type="button" size='sm' onClick={createChattingRoom}>
					전송하기
				</Button>
			</Col>
		</Row>
	}

	var createChattingRoom = () => {
		var chatRoomName = inputValues.inputChattingRoomName;
		var inputMessage = inputValues.inputMessage;

		fetch("http://localhost:8081/chat/room1", {
			method: "POST",
			body: JSON.stringify({
				inputMessage: null,
				chatRoomName: chatRoomName,
				userNo: null,
				isFirst: null,
				sendUserNo: user.no
			}),
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then(res => {
			return res.text();
		}).then(res => {
			if (res == 'success') {
				inputNameList.map((res, index) => {
					fetch("http://localhost:8081/chat/room2", {
						method: "POST",
						body: JSON.stringify({
							inputMessage: inputMessage,
							chatRoomName: chatRoomName,
							userNo: res.no,
							isFirst: index == 0,
							sendUserNo: user.no
						}),
						headers: {
							'Content-Type': "application/json; charset=utf-8",
							'Authorization': localStorage.getItem("Authorization")
						}
					}).then(res => {
						return res.text();
					}).then(res => {
						// setAlertOpen({
						// 	state: true,
						// 	msg: '채팅방이 생성되었습니다'
						// });
						if (index == 0) {
							sendMessage(inputMessage, res);
							alert('채팅방이 생성되었습니다');
							setInputValues({
								inputName: '',
								inputChattingRoomName: '',
								inputMessage: ''
							});
							setFriendsOrChatList({ status: 2, view: true });
							getChatList(user.no, true);
						}
					});
				})
			}
		});
	}

	var findRoomName = () => {
		for (var i = 0; i < chatRoom.length; i++) {
			if (chatRoom[i].roomNo == nowChatRoomNo) return i;
		}
	}

	var findUserName = (userNo) => {
		for (var i = 0; i < userList.length; i++) {
			if (userList[i].no == userNo) return userList[i].name;
		}
	}

	return (
		<div>
			{!alarmInfo.state ? null
				: alarmInfo.sender > 0
/*chat*/ ? alarmInfo.sender != user.no
						? <DivStyle0><div><Row><Col xl='2'>💬</Col> <h5>&nbsp;{findUserName(alarmInfo.sender)}</h5></Row></div><DivSize> </DivSize><Divstyle5>{alarmInfo.message}</Divstyle5></DivStyle0>
						// ? <DivStyle0>{'[' + findUserName(alarmInfo.sender) + '] ' + alarmInfo.message}</DivStyle0>
						: null
/*알람*/ : <DivStyle0><div><Row><Col xl='2'>📢</Col> <h5>&nbsp;notice</h5></Row></div><DivSize> </DivSize><Divstyle5>{alarmInfo.message}</Divstyle5></DivStyle0>
			}

			<div onClick={handleShow}>
				Chatting
			</div>
			<Modal show={show} onHide={handleClose}>
				<DivStyle>
					<Modal.Header>
						<Modal.Title>Chatting {contents == 2 ? '[' + chatRoom[findRoomName()]?.roomName + ']' : null}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col xl='12'>
								{!friendsOrChatList.view ? <></> :
									friendsOrChatList.status == 1 ? <>
										<Button onClick={() => setFriendsOrChatList({ status: 1, view: true })} color="success" size='sm' type="button"> Friends </Button>
										<Button onClick={() => setFriendsOrChatList({ status: 2, view: true })} color="success" size='sm' outline type="button"> ChatRoom </Button>
										<Button onClick={() => setFriendsOrChatList({ status: 3, view: true })} color="success" size='sm' outline type="button"> New Chatting </Button></>
										: friendsOrChatList.status == 2 ? <>
											<Button onClick={() => setFriendsOrChatList({ status: 1, view: true })} color="success" size='sm' outline type="button"> Friends </Button>
											<Button onClick={() => setFriendsOrChatList({ status: 2, view: true })} color="success" size='sm' type="button"> ChatRoom </Button>
											<Button onClick={() => setFriendsOrChatList({ status: 3, view: true })} color="success" size='sm' outline type="button"> New Chatting </Button></>
											: <>
												<Button onClick={() => setFriendsOrChatList({ status: 1, view: true })} color="success" size='sm' outline type="button"> Friends </Button>
												<Button onClick={() => setFriendsOrChatList({ status: 2, view: true })} color="success" size='sm' outline type="button"> ChatRoom </Button>
												<Button onClick={() => setFriendsOrChatList({ status: 3, view: true })} color="success" size='sm' type="button"> New Chatting </Button></>
								}
							</Col>
						</Row>
						<br />
						<Container>
							{friendsOrChatList.status == 1 ? mainContents2() : friendsOrChatList.status == 2 ? mainContents() : mainContents3()}
						</Container>
					</Modal.Body>
				</DivStyle>
				<Modal.Footer>
					{contents == 2 ?
						<Button variant="secondary" size='sm' onClick={() => { setContents(1); setFriendsOrChatList({ ...friendsOrChatList, view: true }); }}>뒤로가기</Button>
						: null
					}
					<Button size='sm' variant="secondary" onClick={handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ChatRoomModal;