/*eslint-disable*/
import { Badge, Button, Card, CardBody, CardTitle, Row, Jumbotron, Table, Input, UncontrolledAlert } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Container, Form, Col, Modal, Tabs, Tab } from 'react-bootstrap';
import ChatRoom from 'components/chat/ChatRoom';
import SendMsg from 'components/chat/SendMsg';
import ReceiveMsg from 'components/chat/ReceiveMsg';
import styled from 'styled-components';
import Friend from 'components/chat/Friend';

const DivStyle = styled.div`
  height: 600px;
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


function ChatRoomModal(props) {
	// ##### ##### Modal ##### #####
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// ##### ##### Modal ##### #####

	// ########## ########## ########## STATE ########## ########## ##########
	const [reload, setReload] = useState(false);
	const [user, setUser] = useState({});           // 로그인 한 유저 정보
	const [userList, setUserList] = useState([]);           // 로그인 한 유저 정보
	const [chatRoom, setchatRoom] = useState([]);   // 로그인 한 유저가 속한 채팅방 정보 / userNo / roomNo / roomName
	const [message, setMessage] = useState([]);
	// const [inputMessage, setInputMessage] = useState('');   // 메시지 입력 값
	const [nowChatRoomNo, setNowChatRoomNo] = useState(0);   // 
	const [conn, setConn] = useState({});
	const [contents, setContents] = useState(1);  // 1: 채팅방 리스트 / 2: 채팅방 안
	const [friendsOrChatList, setFriendsOrChatList] = useState({ status: 1, view: true });  // 1: 친구 / 2: 채팅방
	// ########## ########## ########## STATE ########## ########## ##########

	// ########## ########## ########## MESSAGE ########## ########## ##########
	// 전체 채팅방 조회 (1회 useEffect에서 실행)
	var getChatList = (userNo) => {
		fetch(`http://localhost:8081/chat/rooms/${userNo}`, {
			method: "get",
		}).then((res) => res.json())
			.then((res) => {
				setchatRoom(res);
				setConn({
					stomp: socketConn(res)
				});
			});
	};
	// 채팅방 번호로 채팅 내용 불러오기 (최초, 메시지 받을 때 마다 실행)
	var getMessageFromDB = (chatRoomNo) => {
		fetch(`http://localhost:8081/chat/room/message/${chatRoomNo}`, {
			method: "get",
		}).then((res) => res.json())
			.then((res) => {
				setMessage(res);
			});
	};
	// 메시지 전송 함수
	var sendMessage = (msg, nowChatRoomNo) => {
		conn.stomp.send('/pub/chat/message', {}, JSON.stringify({ chatRoom_no: nowChatRoomNo, msg: msg, send_user_no: user.no }));
	}
	// 메시지 입력 핸들러
	const inputMessageHandler = (e) => {
		e.preventDefault();
		// setInputMessage(e.target.value);
	};
	// 메시지 엔터키 이벤트
	function msgEnterkey(e) {
		//e.preventDefault();
		if (window.event.keyCode == 13) { // 메시지 보내기
			sendMessage(e.target.value, nowChatRoomNo);
		}
	}
	// ########## ########## ########## MESSAGE ########## ########## ##########

	// ########## ########## ########## 주요 로직 ########## ########## ##########
	useEffect(() => {
		fetch("http://localhost:8081/user", { // 유저정보 받아오기
			method: "get",
			headers: {
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then((res) => res.json())
			.then((res) => {
				setUser(res);       // user set 
				getUserList();
				getChatList(res.no);// userNo로 해당 유저의 채팅방 조회   
				// setConn({
				// 	stomp: socketConn()
				// });
			});
	}, [reload]);

	var test = (msg) => {
		console.log('----->', message.length);
		setMessage([...message, msg]);
	}

	var socketConn = (chatRoomList) => {
		var sockJs = new SockJS('http://localhost:8081/stomp/connect');
		var stomp = Stomp.over(sockJs);

		// 2. connection이 맺어지면 실행
		stomp.connect({}, function () {
			console.log('### STOMP Connection ###');

			for(var i=0; i < chatRoomList.length; i++) {
				stomp.subscribe(`/sub/chat/room/${chatRoomList[i].roomNo}`, function (chat) {
					// getMessageFromDB(nowChatRoomNo);

					var content = JSON.parse(chat.body);
					setMessage([...message,{
						msg: content.msg,
						no: content.no,
						read_yn: content.read_yn,
						receive_user_no: content.receive_user_no,
						reg_date: content.reg_date,
						send_user_no: content.send_user_no
					}]);
					//test(content);
				});
			}
			//stomp.subscribe(`/sub/chat/room/1`, function (chat) {
				//var content = JSON.parse(chat.body);
			//	getMessageFromDB(nowChatRoomNo);
			//});
		});

		// stomp.disconnect = () => {
		// 	alert('끊어짐');
		// }

		// stomp.onStompError = () => {
		// 	alert('끊어짐');
		// }

		// stomp.onWebSocketError = () => {
		// 	alert('끊어짐');
		// }

		stomp.onWebSocketClose = () => {
			alert('끊어짐');
		}
		return stomp;
	}
	// ########## ########## ########## 주요 로직 ########## ########## ##########

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
				<DivStyle3>
					<A>
						<Row>
							{message.map((res, index) => {
								if (res?.receive_user_no == user.no) {
									return <>
										{
											user.no != res.send_user_no ?
												<>{/* 내가 받은 거 */}
													<Col xl='6'> <ReceiveMsg key={index} msg={res?.msg} time={'10:55'} count={'1'} name={'홍길동'}></ReceiveMsg> </Col>
													<Col xl='6'> </Col>
												</>
												:
												<>{/* 내가 보낸 거 */}
													<Col xl='6'> </Col>
													<Col xl='6'> <SendMsg key={index} msg={res?.msg} time={'10:55'} count={'1'}></SendMsg> </Col>
												</>
										}
									</>
								}
							})}
						</Row>
					</A>
				</DivStyle3>
				<input
					placeholder="message"
					type="text"
					
					onKeyUp={(e) => msgEnterkey(e)}
				/>
				<Button variant="secondary" onClick={() => { console.log(message); setContents(1); setFriendsOrChatList({ ...friendsOrChatList, view: true }); }}>뒤로가기</Button>
			</>
		}
	}

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

	var mainContents2 = () => {
		return <DivStyle3>
			{userList.map((res, index) => {
				if (res.no != user.no)
					return <Friend key={index} res={res} me={user}></Friend>
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
						}
					});
				})
			}
		});
	}

	// const [alertOpen, setAlertOpen] = useState({ state: false, msg: '' });
	// var alert = () => {
	// 	return <UncontrolledAlert color="success" fade={false}>
	// 		{/* <span className="alert-inner--icon">
	// 						<i className="ni ni-like-2" />
	// 					</span>{" "} */}
	// 		<span className="alert-inner--text">
	// 			<strong>{alertOpen.msg}</strong>
	// 		</span>
	// 	</UncontrolledAlert>
	// };

	return (
		<div>
			<div onClick={handleShow}>
				Chatting
			</div>
			<Modal show={show} onHide={handleClose}>
				{/* {alertOpen.state ? alert() : null} */}
				<DivStyle>
					<Modal.Header>
						<Modal.Title>Chatting</Modal.Title>
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
					<Button size='sm' variant="secondary" onClick={handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ChatRoomModal;