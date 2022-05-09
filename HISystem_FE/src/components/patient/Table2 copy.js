/*eslint-disable*/
import PatientItem from 'components/aaa/PatientItem';
import PatientAddModal from 'components/modal/PatientAddModal';
import DeleteWarning from 'components/modal/public/DeleteWarning';
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
  Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Col
} from "reactstrap";
// core components

const Table2 = () => {

  const tableTitle = ['no', '환자이름', '나이', '성별', '전화번호', '주민번호', '보험여부', '최근방문일자', '']; // 빈 건 우측 드롭다운
  const [page, setPage] = useState([]); // page button 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1); // 현재 page
  const [patients, setPatients] = useState([]); // 환자 list

  const [reload, setReload] = useState(false); //

  useEffect(() => {
    console.log('useeffect');
    getPatientList(nowPage);
  }, [reload]);

  var getPatientList = (page) => {
    fetch(`http://localhost:8081/patient/${page}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setPatients(res);
        let sp = res[0].page.startPage;
        let ep = res[0].page.endPage;
        let tmp = [];
        let index = 0;
        for (var i = sp; i <= ep; i++) {
          tmp[index++] = i;
        }
        console.log(res);
        console.log('tmp: ', tmp);
        setPage(tmp);
        setPageInfo([res[0].page.realEnd, res[0].page.prev, res[0].page.next]);
      });
  };

  // 신규등록 버튼
  const btvEventInsertPatient = (e) => {
    e.preventDefault();
    alert('신규등록모달띄우기');
  };

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));

  var deletePat = function(no) {
    console.log('-------------------->', no);
  }

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>

          <div className="col">

            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col md='11'>
                    <h2 className="mb-0">환자 조회</h2>
                  </Col>
                  {/* secondary / info / size="lg" */}
                  <PatientAddModal></PatientAddModal>
                </Row>
                {/* 우측 상단 검색 / class 제외 navbar-search-dark */}
                <Form className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto">
                  <FormGroup className="mb-0">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">

                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>

                      </InputGroupAddon>
                      <Input placeholder="Search" type="text" />
                    </InputGroup>
                  </FormGroup>
                </Form>
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

                  {patients.map(function (res) {
                    return <PatientItem row_no={res.row_no} no={res.no} name={res.name} del={deletePat}/>
                  })}
                </tbody>
              </Table>

              {/* 페이징 */}
              <CardFooter className="py-4">
                <nav aria-label="...">
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
                            getPatientList(page[0] - 5);
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
                              getPatientList(num);
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
                            getPatientList(page[4] + 1);
                          }
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Table2;