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
import ReceiptingTable from './ReceiptingTable';
import ReceiptTable from './ReceiptTable';
// core components
import styled from 'styled-components';
const h = window.innerHeight * 0.7;
const DivStyle = styled.div`
  height: ${h}px;
`;

// 페이징용 높낮이
const pw = window.innerWidth * 0.65;
const ph = window.innerHeight * 0.62;
const DivStyleFooterPaging = styled.div`
position : absolute;
top: ${ph}px;
left: ${pw}px;
`;

const ReceiptfinTable = () => {

  const tableTitle = ['no', '환자이름', '나이', '성별', '전화번호', '주민번호', '상태', '']; // 빈 건 우측 드롭다운

  // 특별한 class / setPatients: setter 
  const [reservationfin, setReservationfin] = useState([]);
  const [status, setStatus] = useState("3");
  const [reload, setReload] = useState(false);

  // 페이징
  const [page, setPage] = useState([]); // page button 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1); // 현재 page

  //ajax
  var getReservationList = (num) => {
    fetch(`http://localhost:8081/receipt/${status}/0/notSearch/${num}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        setReservationfin(res);
        let sp = res[0]?.page.startPage;
        let ep = res[0]?.page.endPage;
        let tmp = [];
        let index = 0;
        for (var i = sp; i <= ep; i++) {
          tmp[index++] = i;
        }
        setPage(tmp);
        setPageInfo([res[0]?.page.realEnd, res[0]?.page.prev, res[0]?.page.next]);
      });
  }

  useEffect(() => {
    getReservationList(nowPage);
  }, [reload]);

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));
  //no 인덱스
  var idx = 1;
  if (status == "1") {
    return <>
      <ReceiptTable></ReceiptTable>
    </>
  } else if (status == "2") {
    return <>
      <ReceiptingTable></ReceiptingTable>
    </>
  } else {
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
                      <Button color="primary" outline type="button" size='sm' onClick={e => {
                        e.preventDefault();
                        setStatus("2");
                      }}>
                        진료 중
                      </Button>
                      <Button color="primary" type="button" size='sm' >
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
                      if (res.status == '3') {
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
                          {/* 주민번호 */}
                          <td>
                            {res.doctor_name}
                          </td>
                          {/* 예약여부 */}
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              {/* {res.rev_yn == 'Y' ? <i className="bg-warning" />  : <i className="bg-success" />}
                                      {res.rev_yn == 'N' ? '대기중' : '예약환자'} */}
                              <i className="bg-danger" /> 진료 완료
                            </Badge>
                          </td>
                        </tr>
                      }
                    })}
                  </tbody>
                </Table>

                {/* 페이징 */}
                <CardFooter className="py-7">
                  <nav aria-label="...">
                  <DivStyleFooterPaging>
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem>
                        <PaginationLink
                          onClick={(e) => {
                            e.preventDefault();
                            if (pageInfo[1]) {
                              setNowPage(page[0] - 5);
                              getReservationList(page[0] - 5);
                            }
                          }}
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {/* 12345 */}
                      {page.map((num) => {
                        return <PaginationItem className={nowPage == num ? "active" : ""}>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(pageInfo);
                              if (num <= pageInfo[0]) {
                                setNowPage(num);
                                getReservationList(num);
                              }
                            }}>
                            {num}
                          </PaginationLink>
                        </PaginationItem>
                      })}
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            if (pageInfo[2]) {
                              setNowPage(page[4] + 1);
                              getReservationList(page[4] + 1);
                            }
                          }}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                    </DivStyleFooterPaging>
                  </nav>
                </CardFooter>
                </DivStyle>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
};

export default ReceiptfinTable;