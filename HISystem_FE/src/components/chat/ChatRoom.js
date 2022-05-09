/*eslint-disable*/
import React, { useState } from 'react';
import { Badge, Col, Row } from 'reactstrap';
import styled from 'styled-components';

const DivStyle = styled.div`
  width: 400px;
  height : 80px;
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: 2px solid #F3F7F9;
  cursor: pointer;
  //border-radius: 5px;
  ${({ a }) => {
      return a ? `background-color: #F3F7F9;` : null;
    }}
`;

const Title = styled.div`
  padding-bottom: 5px;
  font-weight: bolder;
`;

const Contents = styled.div`
  font-size:14px;
`;

const TimeStyle = styled.div`
  font-size:12px;
`;

const ChatRoom = (props) => {
  const [aaa, setAaa] = useState(false);
  const { title, contents, time, count, clickEvent } = props;

  return (
    <DivStyle a={aaa} onClick={clickEvent} onMouseOver={() => setAaa(true)} onMouseOut={() => setAaa(false)}>
      <Row>
        <Col xl='10'>
          <Title>{title}</Title>
        </Col>
        <Col xl='2'>
          <Title>
            <Badge color="danger" pill>
              {count}
            </Badge>
          </Title>
        </Col>
      </Row>
      <Row>
        <Col xl='10'>
          <Contents>{contents}</Contents>
        </Col>
        <Col xl='2'>
          <TimeStyle>
            {time}
          </TimeStyle>
        </Col>
      </Row>
    </DivStyle>

  );
};

export default ChatRoom;