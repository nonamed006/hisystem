import React from 'react';
import {
    Table,
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
  } from "reactstrap";
  import styled from 'styled-components';
  
  const DivStyle = styled.div`
    border: none;
    margin: 50px 0px 0px 30px;
    padding: 30px 30px 10px 30px;
  `;
  
  const HeaderWrapStyle = styled.div`
    border-bottom :1px solid ;
    margin: 50px 30px 10px 30px;
    padding: 30px 30px 10px 30px;
  
  `;
  
  const RemarkStyle = styled.div`
  border :1px solid ;
  margin: 50px 30px 10px 30px;
  padding: 30px 30px 10px 30px;
  `
const PrintContent = ({proof,componentRef}) => {
    return (
        <div style={{ display: 'none' }}>
        <div id="printPdf" ref={componentRef}>
          <Card style={{ height: '100%' }}>
            <HeaderWrapStyle>
              <span style={{ fontSize: '60px', display: 'block', textAlign: 'center' }}>진단서</span>
            </HeaderWrapStyle>
              <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>진단번호</strong>
                <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.diag_no}</span>
              </DivStyle>
              <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>환자이름</strong>
                <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.patient_name}</span>
              </DivStyle>

              <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>담당의사</strong>
                <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.doctor_name}</span>
              </DivStyle>

            <DivStyle>
               <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>진단일</strong>
                <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.diag_date}</span>
            </DivStyle>
            <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>병명</strong>
                <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.diseases_kr}/{proof.diseases_en}</span>
            </DivStyle>
            <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>소견</strong>
                <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.remark}</span>
              <DivStyle>
              </DivStyle>
            </DivStyle>
            <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'right' }}>접수자</strong>
                <span style={{ fontSize: '30px', display: 'block', textAlign: 'right' }}>{proof.staff_name}</span>
            </DivStyle>
          </Card>
        </div>
      </div>
    );
};

export default PrintContent;