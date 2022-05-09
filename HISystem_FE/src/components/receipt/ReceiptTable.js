/*eslint-disable*/
import PatientAddModal from 'components/modal/PatientAddModal';
import React, { useEffect, useState } from 'react';
import DeleteWarning from 'components/modal/public/DeleteWarning';

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
import ReceiptingTable from './ReceiptingTable';
import InputBox from 'components/input/InputBox';
import styled from 'styled-components';
import ReservationAddModal from 'components/modal/ReservationAddModal';
// core components

const h = window.innerHeight * 0.7;
const DivStyle = styled.div`
  height: ${h}px;
`;
const SpanStyle = styled.span`
  cursor:pointer;
`;



// 페이징용 높낮이
const pw = window.innerWidth * 0.65;
const ph = window.innerHeight * 0.62;
const DivStyleFooterPaging = styled.div`
position : absolute;
top: ${ph}px;
left: ${pw}px;
`;


const ReceiptTable = (props) => {

  const sendAlarm = props.sendAlarm;

  const tableTitle = ['no', '환자이름', '나이', '성별', '전화번호', '주민번호', '증상', '담당의사', '상태', '입실', '삭제']; // 빈 건 우측 드롭다운

  // 특별한 class / setPatients: setter 
  //########## state ###############
  const [reservation, setReservation] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("1");
  const [reload, setReload] = useState(false);

  // 페이징
  const [page, setPage] = useState([]); // page button 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1); // 현재 page


  var getReservationList = (num) => {
    fetch(`http://localhost:8081/receipt/1/4/${search == '' ? 'notSearch' : search}/${num}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setReservation(res);
        let sp = res[0]?.page.startPage;
        let ep = res[0]?.page.endPage;
        let tmp = [];
        let index = 0;
        for (var i = sp; i <= ep; i++) {
          tmp[index++] = i;
        }
        setPage(tmp);
        setPageInfo([res[0]?.page.realEnd, res[0]?.page.prev, res[0]?.page.next]);
        console.log(reservation);
      });
  }

  var pushPatient = (no, user_no) => {
    fetch(`http://localhost:8081/receipt/${no}/${user_no}`, {
      method: "put",
      // res에 결과가 들어옴
    }).then((res) => res.text())
      .then((res) => {
        if (res == 'success') {
          alert('변경되었습니다');
          setReload(!reload);
        } else {
          alert("실패");
        }
      }
      );
  }

  // 방문예약-진료대기
  var pushPatient2 = (no) => {
    fetch(`http://localhost:8081/receipt/2/${no}`, {
      method: "put",
      // res에 결과가 들어옴
    }).then((res) => res.text())
      .then((res) => {
        if (res == 'success') {
          alert("변경되었습니다");
          setReload(!reload);
        } else {
          alert("실패");
        }
      }
      );
  }

  useEffect(() => {
    getReservationList(nowPage);
  }, [reload]);

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));


  //검색창
  const inputSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색 엔터키 이벤트
  function enterkey(e) {
    e.preventDefault();

    if (window.event.keyCode == 13) {
      setNowPage(1);
      getReservationList(1);

    }
  }

  // 검색 값 넘기는 fetch
  // var seachFunction = ()=>{
  //   fetch(`http://localhost:8081/reservation/진료대기//${search}`, {
  //     method: "get",
  //     // res에 결과가 들어옴
  //   }).then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       setReservation(res);
  //     });
  // }
  if (status == '1') {
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
                          진료 대기
                        </Button>
                        <Button color="primary" outline type="button" size='sm' onClick={e => {
                          e.preventDefault();
                          setStatus("2");
                        }}>
                          진료 중
                        </Button>
                        <Button color="primary" outline type="button" size='sm' onClick={e => {
                          e.preventDefault();
                          setStatus("3");
                        }}>
                          진료 완료
                        </Button>
                      </Col>
                      <Col md='2'>
                        {/* secondary / info / size="lg" */}
                        <ReservationAddModal reload={reload} setReload={setReload}></ReservationAddModal>
                      </Col>
                      <Col >
                        {/* 우측 상단 검색 / class 제외 navbar-search-dark */}
                        <InputBox
                          placeholder="Search"
                          type="text"
                          value={search}
                          onChange={inputSearch}
                          onKeyUp={(e) => enterkey(e)}
                        />
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
                      {reservation.map(function (res) {
                        return <tr>

                          {/* no */}
                          <td>
                            {res.row_no}
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
                            <Badge color="" className="badge-dot mr-4">
                              { res.dia_status == 'Y' ? <i className="bg-success" /> : <i className="bg-danger" /> }
                              {res.doctor_name}
                              { res.dia_status == 'Y' ? ` (진료 가능)` : ` (진료 중)` }
                            </Badge>
                          </td>
                          {/* 예약여부 */}
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              {res.status == '4' ? <i className="bg-yellow" /> : <i className="bg-info" />}
                              {res.status == '4' ? <SpanStyle onClick={() => pushPatient2(res.no)}>예약-방문대기중</SpanStyle> : '대기중'}
                            </Badge>
                          </td>
                          {/* 입실 */}
                          <td>
                            <SpanStyle>{ res.dia_status == 'Y' ?
                              <i
                                onClick={() => {

                                  sendAlarm(res.user_doctor_no, res.no, res.name, '곧 입실합니다');

                                  pushPatient(res.no, res.user_doctor_no);
                                }}
                                className="ni ni-curved-next"></i>
                                : null
                              }
                            </SpanStyle>
                          </td>
                          {/* 접수 삭제 버튼 */}
                          <td><DeleteWarning id={res.no} deleteTarget={'receipt'} reload={reload} setReload={setReload}></DeleteWarning></td>
                          <td />
                        </tr>
                      })}
                    </tbody>
                  </Table>

                  {/* 페이징 */}
                  <CardFooter className="py-5">
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
  } else if (status == "2") {
    return <>
      <ReceiptingTable></ReceiptingTable>
    </>
  } else {
    return <>
      <ReceiptfinTable></ReceiptfinTable>
    </>
  }
};


export default ReceiptTable;