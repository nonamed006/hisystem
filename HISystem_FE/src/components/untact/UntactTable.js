import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { Badge, Button, Card, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import styled from 'styled-components';

const UntactTable = () => {

  const tableTitle = ['no', '환자이름', '나이', '성별', '전화번호', '주민번호', '담당의사', '상태', '증상', '승인', '거절'];
  const h = window.innerHeight * 0.7;
  const DivStyle = styled.div`
    height: ${h}px;
  `;

  // state 
  const [untactlist, setUntactlist] = useState([]);
  const [reload, setReload] = useState(false);

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));

  var ok = (no) => {
    fetch(`http://localhost:8081/user/untact/ok1/${no}`, {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("Authorization")
      }
    }).then((res) => res.text())
      .then((res) => {
        if(res == 'success'){
          setReload(!reload);
          alert('접수되었습니다');
        }
        
      });
  }

  useEffect(() => {  
    fetch(`http://localhost:8081/untact`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setUntactlist(res);
        console.log(res);
      });
  }, [reload]);

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
                  <Col md='10'>
                  <Button color="primary" type="button" size='sm'>
                        비대면 접수 현황
                      </Button> 
                  </Col>
                </Row>
                
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
                {untactlist.map(function (res) {

                    return <tr> 
                      <th scope="row">
                          {/* no */}
                          <span className="mb-0 text-sm">
                            {/* {idx++} */}
                            {res.row_no}
                          </span>
                        </th>
                        {/* 이름 */}
                        <td>
                          {res.name}
                        </td>
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
                        {/* 담당의사 */}
                        <td>
                          {res.doctor_no}
                        </td>
                        {/* 상태 */}
                        <td>
                        <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" /> 승인 대기
                          </Badge>
                        </td>
                        {/* 증상 */}
                        <td>
                          {res.remark}
                        </td>
                        {/* 승인 */}
                        <td>

                        <Button color="success" outline size ='sm' type="button" onClick={() => {ok(res.no)}}>
          승인
        </Button>
                        </td>
                        {/* 거절 */}
                        <td>
                        <Button color="warning" outline size='sm' type="button">
          거절
        </Button>
                        </td>

                    </tr>
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
};

export default UntactTable;