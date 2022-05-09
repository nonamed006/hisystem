/*eslint-disable*/
import PatientAddModal from 'components/modal/PatientAddModal';
import React, { useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Col, Badge
} from "reactstrap";
import ReceiptfinTable from './ReceiptfinTable';
import ReceiptTable from './ReceiptTable';
// core components
import styled from 'styled-components';
const h = window.innerHeight * 0.7;
const DivStyle = styled.div`
  height: ${h}px;
`;
const ReceiptingTable = () => {

  const tableTitle = ['no', '환자이름', '나이', '성별', '전화번호', '주민번호', '증상', '담당의사','상태', '']; // 빈 건 우측 드롭다운

  // 특별한 class / setPatients: setter 
  const [reservationfin, setReservationfin] = useState([]);
  const [status, setStatus] = useState("2");


  // 
  useEffect(() => {
    //ajax
    fetch(`http://localhost:8081/receipt/${status}/0/notSearch/1`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        setReservationfin(res);
      });
  }, []);

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));
  //no 인덱스
  var idx = 1;
  if (status == "1") {
    return <>
      <ReceiptTable></ReceiptTable>
    </>
  } else if (status == "2") {
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
              <DivStyle>

                <CardHeader className="border-0">
                  <Row>
                    <Col md='11'>
                      <Button color="primary" outline type="button" size='sm' onClick={e => {
                        e.preventDefault();
                        setStatus("1");
                      }}>
                        진료 대기
                      </Button> 
                      <Button color="primary" type="button" size='sm' >
                        진료 중
                      </Button> 
                      <Button color="primary" outline type="button" size='sm' onClick={e => {
                        e.preventDefault();
                        setStatus("3");
                      }}>
                        진료 완료
                      </Button>
                    </Col>
                    {/* secondary / info / size="lg" */}
                  </Row>
                  {/* 우측 상단 검색 / class 제외 navbar-search-dark */}
                </CardHeader>




                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    {/* 테이블 헤더 이름 */}
                    <tr>
                      {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>

                    {reservationfin.map(function (res) {
                      if (res.status == '2') {
                        return <tr>

                            {/* no */}
                            <td>
                              {idx++}
                              </td>
                          {/* 이름 */}
                          <th scope="row">
                        <span className="mb-0 text-sm">
                          {res.name}
                        </span>
                      </th>
                          {/* 나이 */}
                          <td>
                            {ssnToAge(res.ssn)}
                          </td>
                          {/* 성별 */}
                          <td>
                            {res.gender}
                          </td>
                          {/* 전화번호 */}
                          <td>
                            {res.phone}
                          </td>
                          {/* 주민번호 */}
                          <td>
                            {res.ssn}
                          </td>
                          {/* 증상 */}
                          <td>
                            {res.remark}
                          </td>
                          {/* 담당의사 */}
                          <td>
                            {res.doctor_name}
                          </td>
                          {/* 예약여부 및 진료중, 종결 상태 */}
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" /> 진료중
                            </Badge>
                          </td>
                          <td />
                          <td />
                        </tr>
                      }
                    })}
                  </tbody>
                </Table>
                </DivStyle>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  } else {
    return <>
      <ReceiptfinTable></ReceiptfinTable>
    </>
  }
};

export default ReceiptingTable;