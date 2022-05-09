/*eslint-disable*/

import React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

const MsgBox = styled.div`
    width: 170px;
    overflow:hidden;word-wrap:break-word;
    padding: 10px 10px 0px 10px;
    //margin: 10px;
    border-radius: 10px;
    background-color: #CCE5FF;
  `;
const Timestyle = styled.div`
    font-size: 10px;
    //text-align: right;
    //margin-left: 140px;
    padding-bottom: 10px;

  `;
const MsgContents = styled.p`
    font-weight: 500;
  `
const Cnt = styled.p`
    font-size: 12px;
    font-weight: 500;
    color: #FF3333;
  `;
const NameStyle = styled.div`
    font-size: 17px;
    padding: 3px;

  `;

const ReceiveMsg = (props) => {

  const { msg, time, count, name } = props;
  return (
    <>
      <NameStyle>{name}</NameStyle>
      <MsgBox>
        <MsgContents>
          {msg}
        </MsgContents>
      </MsgBox>
      <Row>
        <Col xl='8'>
          <Timestyle>{time}</Timestyle>
        </Col>
        <Col xl='4'>
          <Cnt>
            {count}
          </Cnt>
        </Col>
      </Row>
    </>
  );
};

export default ReceiveMsg;