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
    background-color: #FFFF99;
  `;
  const Timestyle = styled.div`
    font-size: 10px;
    //text-align: right;
    //margin-left: 140px;
    padding-bottom: 10px;

  `;
  const MsgContents = styled.p`
    font-weight: 500;
  `;
  const Cnt = styled.p`
    font-size: 12px;
    font-weight: 500;
    color: #FF3333;
  `;

const SendMsg = (props) => {
  
  const {msg, time, count} = props;
    return (
      <>
        <MsgBox>
          <MsgContents>
            {msg}
          </MsgContents>
        </MsgBox>
        <Row>
          <Col xl='7'>
            <Cnt>
              {count}
            </Cnt>
          </Col>
          <Col xl='5'>
          <Timestyle>{time}</Timestyle>
          </Col>
        </Row>
      </>
    );
};

export default SendMsg;