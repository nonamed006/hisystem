/*eslint-disable*/
import React from 'react';
import { useState } from 'react/cjs/react.development';
import { Col, Row, Button } from 'reactstrap';
import styled from 'styled-components';

const DivStyle = styled.div`
  width: 400px;
  height : 50px;
  padding: 10px 10px 0px 10px ;
  border-bottom: 2px solid #F3F7F9;
  //text-align: left;
  ${({ a }) => {
    return a ? `background-color: #F3F7F9;` : null;
  }}
`;
const DivStyle2 = styled.div`
  text-align: right;
`;
const DivStyle3 = styled.div`
  text-align: left;
  padding: 3px 0px 0px 0px ;
`;
const PStyle = styled.p`
  font-size: 12px;
  font-weight: 500;
  ${({ a }) => {
    return a ? `color: green;` : `color: black;`;
  }}
`;

const Friend = (props) => {
  const [aaa, setAaa] = useState(false);
  const { res, me, getChatList, setNowChatRoomNo, sendMessage, getMessageFromDB, setFriendsOrChatList, setContents } = props;

  var clickChatting = (i, you, iName, youName) => {
    fetch(`http://localhost:8081/chat/room/${i}/${you}`, {
      method: "get",
    }).then((res) => res.text())
      .then((res) => {
        if (res == -1) {
          fetch("http://localhost:8081/chat/room1", {
            method: "POST",
            body: JSON.stringify({
              inputMessage: null,
              chatRoomName: iName+', '+youName,
              userNo: null,
              isFirst: null,
              sendUserNo: i
            }),
            headers: {
              'Content-Type': "application/json; charset=utf-8",
              'Authorization': localStorage.getItem("Authorization")
            }
          }).then(res => {
            return res.text();
          }).then(res => {
            if (res == 'success') {
              
              fetch("http://localhost:8081/chat/room2", {
                method: "POST",
                body: JSON.stringify({
                  inputMessage: iName+'님이 채팅방을 생성하였습니다 !',
                  chatRoomName: iName+', '+youName,
                  userNo: you,
                  isFirst: true,
                  sendUserNo: i
                }),
                headers: {
                  'Content-Type': "application/json; charset=utf-8",
                  'Authorization': localStorage.getItem("Authorization")
                }
              }).then(res => {
                return res.text();
              }).then(res => {
                  sendMessage(iName+'님이 채팅방을 생성하였습니다 !', res);
                  alert('채팅방이 생성되었습니다');
                  setFriendsOrChatList({ status: 2, view: false });
                  setContents(2);
                  getMessageFromDB(res);
                  setNowChatRoomNo(res);
                  getChatList(i, true)
              });
              
            }
          });
        }
        // 이동 및 불러오기 
        else {
          setFriendsOrChatList({ status: 2, view: false });
          setContents(2);
          getMessageFromDB(res);
          setNowChatRoomNo(res);
        }
      });
  }

  return (
    <DivStyle a={aaa} onMouseOver={() => setAaa(true)} onMouseOut={() => setAaa(false)}>
      <Row>
        <Col xl='1'>
          <DivStyle3>
            {res.connect == 'Y' ?
              <PStyle a={true}>ON</PStyle> :
              <PStyle a={false}>OFF</PStyle>
            }
          </DivStyle3>
        </Col>
        <Col xl='1'>
          <DivStyle3>
            <i className="ni ni-circle-08"></i>
          </DivStyle3>
        </Col>
        <Col xl='7'>
          <DivStyle3>
            <p>{res.name}</p>
          </DivStyle3>
        </Col>
        <Col xl='3'>
          <DivStyle2>
            <Button onClick={() => clickChatting(me.no, res.no, me.name, res.name)}
              color="success" size='sm' outline type="button"> 채팅 </Button>
          </DivStyle2>
        </Col>
      </Row>
    </DivStyle>
  );
};

export default Friend;