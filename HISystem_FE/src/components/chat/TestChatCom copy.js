/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { Stomp } from '@stomp/stompjs';

const TestChatCom = () => {
    var sockJs = new SockJS('http://localhost:8081/stomp/connect');
    var stomp = Stomp.over(sockJs);
    // ########## ########## ########## STATE ########## ########## ##########
    const [chatInfo, setChatInfo] = useState({
        name: '채팅방이름',
        roomId: 1,
        userName: '이하윤'
    });
    const [reload, setReload] = useState(false);
    const [user, setUser] = useState({});           // 로그인 한 유저 정보
    const [chatRoom, setchatRoom] = useState([]);   // 로그인 한 유저가 속한 채팅방 정보 / userNo / roomNo / roomName
    const [message, setMessage] = useState([]);
    const [inputMessage, setInputMessage] = useState('');   // 메시지 입력 값
    // ########## ########## ########## STATE ########## ########## ##########

    // ########## ########## ########## STATE ########## ########## ##########

    // ########## ########## ########## MESSAGE ########## ########## ##########
    // 전체 채팅방 조회 (1회 useEffect에서 실행)
    var getChatList = (userNo) => {
        fetch(`http://localhost:8081/chat/rooms/${userNo}`, {
            method: "get",
        }).then((res) => res.json())
            .then((res) => {
                setchatRoom(res);
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
    var sandMessage = (msg) => {
        stomp.send('/pub/chat/message', {}, JSON.stringify({ chatRoom_no: 1, msg: msg, send_user_no: user.no }));
    }
    // 메시지 입력 핸들러
    const inputMessageHandler = (e) => {
        e.preventDefault();
        setInputMessage(e.target.value);
    };
    // 메시지 엔터키 이벤트
    function enterkey(e) {
        e.preventDefault();
        if (window.event.keyCode == 13) {
            // 메시지 보내기
            sandMessage(inputMessage);
        }
    }
    // ########## ########## ########## MESSAGE ########## ########## ##########

    // ########## ########## ########## 주요 로직 ########## ########## ##########
    var useEffectCheck = true;
    useEffect(() => {
        // 유저정보 받아오기 (젤 먼저 실행 요구)
        if (useEffectCheck) {
            fetch("http://localhost:8081/user", {
                method: "get",
                headers: {
                    'Authorization': localStorage.getItem("Authorization")
                }
            }).then((res) => res.json())
                .then((res) => {
                    setUser(res);       // user set 
                    getChatList(res.no);// userNo로 해당 유저의 채팅방 조회   
                });
            useEffectCheck = false;
        }
        getMessageFromDB(1);
    }, [reload]);
    // 소켓 연결
    var socketConn = () => {
        // 2. connection이 맺어지면 실행
        stomp.connect({}, function () {
            console.log('STOMP Connection');

            // 4. subscribe(path, callback)으로 메세지를 받을 수 있음
            // for 돌려야 함
            //stomp.subscribe(`/sub/chat/room/${chatRoom[0].roomNo}`, function (chat) {
            stomp.subscribe(`/sub/chat/room/1`, function (chat) {
                var content = JSON.parse(chat.body);

                var roomId = content.roomId;
                var writer = content.writer;
                var message = content.message;
                var msg = {
                    roomId: content.roomId,
                    writer: content.writer,
                    message: content.message
                }
                //messageAdd(message)
                //setMessage(message.concat(msg));
                //console.log(message);
                //alert('알람!');

                setReload(!reload);
            });

            //3. send(path, header, message)로 메세지를 보낼 수 있음 / *채팅방에 참여 
            //stomp.send('/pub/chat/enter', {}, JSON.stringify({ roomId: chatRoom[0].roomNo, writer: user.name }));
            stomp.send('/pub/chat/enter', {}, JSON.stringify({ roomId: 1, writer: user.name }));
        });
    }
    socketConn();
    // ########## ########## ########## 주요 로직 ########## ########## ##########

    return (
        <>
            <h1>현재 소속된 채팅방</h1>
            {chatRoom.map(function (res) {
                return <div>
                    no: {res.roomNo} / name: {res.roomName}
                </div>
            })}
            <button onClick={
                sandMessage
            }>^_^</button>
            {message.map((res) => {

                if (res?.receive_user_no == user.no) {
                    return <div>
                        보낸유저: {res?.send_user_no} // 내용: {res?.msg}
                    </div>
                }
            })}

            <input
                placeholder="message"
                type="text"
                value={inputMessage}
                onChange={inputMessageHandler}
                onKeyUp={(e) => enterkey(e)}
            />
        </>
    )
};

export default TestChatCom;