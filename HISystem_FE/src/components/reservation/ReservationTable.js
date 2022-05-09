/*eslint-disable*/
import Datepicker from 'components/input/Datepicker';
import InputBox from 'components/input/InputBox';
import PatientAddModal from 'components/modal/PatientAddModal';
import React, { useEffect, useState } from 'react';
import ReactDatetime from "react-datetime";
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
import ReservationAddModal2 from 'components/modal/ReservationAddModal2';
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
// core components

const ReservationTable = () => {


  const tableTitle = ['no', '환자이름', '나이', '성별', '전화번호', '주민번호', '예약일시', '상태', '증상', '삭제'];

  const [search, setSearch] = useState("");
  const [date, setDate] = useState('');

  const [reload, setReload] = useState(false);

  // 페이징 
  const [page, setPage] = useState([]); // page button 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1); // 현재 page


  const handleDate = Idate => {
    setDate(Idate);
    setReload(!reload);
    setNowPage(1);
    console.log(reload);
  };

  // 특별한 class / setPatients: setter 
  const [reservation, setReservation] = useState([]);

  // 달력에서 받은 날짜 형변환
  var getDate = (date) => date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

  // 조회 및 검색
  var getReservationList = (num) => {
    var date2 = new Date(date);
    console.log('1111', getDate(date2));
    fetch(`http://localhost:8081/reservation/${date == '' ? '9999-12-31' : getDate(date2)}/${search == '' ? 'notSearch' : search}/${num}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setReservation(res);
        console.log(res);
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

  // 
  useEffect(() => {
    getReservationList(1);
    setNowPage(1);
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

  //no 인덱스
  var idx = 1;
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
                        예약 현황
                      </Button> 
                  </Col>
                  {/* secondary / info / size="lg" 
                  신규등록*/}
                  <Col md='2'>
                    <ReservationAddModal2 setNowPage={setNowPage} nowPage={nowPage} getReservationList={getReservationList} reload={reload} setReload={setReload}></ReservationAddModal2>
                  </Col>
                </Row>
                <Row>
                  <Col xs='2'>
                    {/* 우측 상단 검색 / class 제외 navbar-search-dark */}
                    <InputBox
                      placeholder="Search"
                      type="text"
                      value={search}
                      onChange={inputSearch}
                      onKeyUp={(e) => enterkey(e)}
                    />
                  </Col>
                  <Col xs='3'>
                    <Row>
                    <Col xs='10'>
                    {/* <Datepicker></Datepicker> */}

                    {/* 달력 */}
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        {/* 아이콘 */}
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        {/* 달력 input */}
                        <ReactDatetime
                          onChange={(e) => handleDate(e)}
                          value={date}
                          inputProps={{
                            placeholder: "날짜를 선택하세요"
                          }}
                          dateFormat="YYYY-MM-DD"
                          timeFormat="HH:mm"
                        // timeFormat={false}
                        />
                      </InputGroup>
                    </FormGroup>
                    </Col>
                    </Row>
                  </Col>
                  <Col xs='6'></Col>
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
                    if (res.rev_yn == 'Y') {
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
                        {/* 예약일시 */}
                        <td>
                          {res.rev_date}
                        </td>
                        {/* 예약여부 */}
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            {res.status == '4' ? <i className="bg-yellow" /> : res.status == '1' ? <i className="bg-info" /> : 
                              res.status == '2' ? <i className="bg-success" /> : <i className="bg-warning" />}
                            {res.status == '4' ? '예약-방문대기중' : res.status == '1' ? '예약-대기중' : res.status == '2' ? '진료중' : '진료종료'}
                          </Badge>
                        </td>
                        {/* 증상 */}
                        <td>
                          {res.remark}
                        </td>
                        {/* 접수 삭제 버튼 */}
                        <td><DeleteWarning id={res.no} deleteTarget={'reservation'} reload={reload} setReload={setReload}></DeleteWarning></td>
                        <td />
                      </tr>
                    }
                  })}

                </tbody>
              </Table>

              {/* 페이징 */}
              {/* <DivStylePaging> */}
              <CardFooter className="py-6">

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
              {/* </DivStylePaging> */}
              </DivStyle>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ReservationTable;