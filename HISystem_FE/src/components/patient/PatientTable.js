/*eslint-disable*/
import InputBox from 'components/input/InputBox';
import PatientAddModal from 'components/modal/PatientAddModal';
import PatientDetailModal from 'components/modal/PatientDetailModal';
import DeleteWarning from 'components/modal/public/DeleteWarning';
import UserDetailModal from 'components/modal/UserDetailModal';
import React, { useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

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
const PatientTable = () => {

  const tableTitle = ['no', '환자이름', '나이', '성별', '전화번호', '주민번호', '보험여부', '최근방문일자', '삭제']; // 테이블 헤더

  // state 변수
  const [page, setPage] = useState([]);         // page button => ex) 1, 2, 3, 4, 5 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1);    // 현재 선택된 page
  const [search, setSearch] = useState('');     // 검색어 
  const [reload, setReload] = useState(false);  // 삭제로 인한 리로드 체크
  const [patients, setPatients] = useState([]); // 테이블에 들어가는 환자 list
  const [modalState, setModalState] = useState({ isOpen: false }); // 상세보기

  /*  useEffect
      최초 로딩시 페이지: 1 / 검색어: ''
      환자 리스트를 조회
  */
  useEffect(() => {
    getPatientList(nowPage, search);
  }, [reload]);

  // 환자 리스트 조회 함수
  var getPatientList = (page, name) => {
    fetch(`http://localhost:8081/patient/${page}/${name == '' ? 'notSearch' : name}`, {
      method: "get",
    }).then((res) => res.json())
      .then((res) => {
        setPatients(res);
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
  };

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));

  // 검색창
  const inputSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색 엔터키 이벤트
  function enterkey(e) {
    e.preventDefault();

    if (window.event.keyCode == 13) {
      setNowPage(1);
      getPatientList(1, search);
    }
  }

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
                  {/* 테이블 좌측 상단 제목 */}
                  <Col md='11'>
                    <Button color="primary" type="button" size='sm'>
                      환자 조회
                    </Button>
                  </Col>
                  {/* 테이블 우측 상단 신규등록 모달 버튼 */}
                  <PatientAddModal reload={reload} setReload={setReload} ></PatientAddModal>
                </Row>
                {/* 테이블 좌측 상단 검색창 */}
                {/* <input
                  placeholder="Search"
                  type="text"
                  value={search}
                  onChange={inputSearch}
                  onKeyUp={(e) => enterkey(e)}
                /> */}
                <InputBox
                  placeholder="Search"
                  type="text"
                  value={search}
                  onChange={inputSearch}
                  onKeyUp={(e) => enterkey(e)}
                />
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                  <tr>
                    {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                    <th scope="col" />
                  </tr>
                </thead>

                <tbody>
                  {patients.map(function (res) {
                    return <tr>
                      {/* no */}
                      <td onClick={() => setModalState({ isOpen: true })}>{res.row_no}</td>
                      {/* 이름 */}
                      <th onClick={() => setModalState({ isOpen: true })} scope="row">
                        <span className="mb-0 text-sm">
                          {res.name}
                        </span>
                      </th>
                      {/* 나이 */}
                      <td onClick={() => setModalState({ isOpen: true })}>{ssnToAge(res.ssn)}</td>
                      {/* 성별 */}
                      <td onClick={() => setModalState({ isOpen: true })}>{res.gender}</td>
                      {/* 전화번호 */}
                      <td onClick={() => setModalState({ isOpen: true })}>{res.phone}</td>
                      {/* 주민번호 */}
                      <td onClick={() => setModalState({ isOpen: true })}>{res.ssn}</td>
                      {/* 보험여부 */}
                      <td onClick={() => setModalState({ isOpen: true })}>{res.insurance_yn}</td>
                      {/* 최근방문일자 */}
                      <td onClick={() => setModalState({ isOpen: true })}>{res.visit_date}</td>
                      {/* 삭제버튼 */}
                      <td><DeleteWarning id={res.no} deleteTarget={'patient'} reload={reload} setReload={setReload}></DeleteWarning></td>
                    </tr>
                  })}
                </tbody>
              </Table>

              {/* 페이징 */}
              <CardFooter className="py-4">
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
                            getPatientList(page[0] - 5, search);
                          }
                        }}
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {page.map((num) => {
                      return <PaginationItem className={nowPage == num ? "active" : ""}>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            if (num <= pageInfo[0]) {
                              setNowPage(num);
                              getPatientList(num, search);
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
                            getPatientList(page[4] + 1, search);
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

        <PatientDetailModal
          이름='1'
          name='1'
          id='1'
          gender='1'
          role='1'
          phone='1'
          ssn='1'
          addr='1'
          reg_date='1'
          age='1'
          setModalState={setModalState}
          modalState={false}
        //modalState = {modalState} 
        />

      </Container>
    </>
  );
};

export default PatientTable;