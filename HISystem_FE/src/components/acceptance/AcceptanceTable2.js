import InputBox from "components/input/InputBox";
import { useEffect, useState } from "react";
import ReactDatetime from "react-datetime";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import styled from "styled-components";

const TrStyle = styled.tr`
  cursor: pointer;
  ${({ isSelected }) => {
    return isSelected ? `background-color: #e3fafc;` : null;
  }}
`;

const h = window.innerHeight * 0.7;
const DivStyle = styled.div`
  height: ${h}px;
`;
const DivStyle2 = styled.div`
  margin : 20px;
`;

const DivStylePatientName = styled.div`
  margin-bottom: 25px;
  padding: 10px 0px 0px 20px;
 
`;

const DivStyle3 = styled.div`
  width: 750px;
  /border-top: 1px solid lightgrey;
  /border-bottom: 1px solid lightgrey;
  /border: 1px solid lightgrey;
  margin-top: 0px;
  padding: 20px 20px 20px 10px;
`;

const DivStyle4 = styled.div`
  
  padding: 10px;

`;

const DivStyle6 = styled.div`
  width: 150px;
  
`;
const DivStyle8 = styled.div`
  padding: 10px 10px 30px 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid lightgrey;
  
`;

const DivStyle7 = styled.div`
  width: 150px;
  
`;

const DivStyle5 = styled.div`
  margin-top: 15px;
`;

// const DivStylePaging = styled.div`
// position : absolute;
// top: 590px;
// left: 480px

// `;

const pw = window.innerWidth * 0.23;
  const ph = window.innerHeight * 0.62;
  const DivStyleFooterPaging = styled.div`
  position : absolute;
  top: ${ph}px;
  left: ${pw}px;
  `;

const DivStyleFooterBtn = styled.div`
position : absolute;
top: 520px;
left: 370px

`;

const AcceptanceTable2 = () => {

  const tableTitle = ['no', '환자이름', '나이', '전화번호', '주민번호', '증상', '수납 상태'];
  const righttableTitle = ['', '세부정보', '', '금액', ''];

  // ###### state #######
  const [acceptance, setAcceptance] = useState([]);
  const [status, setStatus] = useState("1");
  const [accDetail, setAccDetail] = useState(null);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const [tableIndex, setTableIndex] = useState(1); // 선택된 행

  // 페이징
  const [page, setPage] = useState([]); // page button 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1); // 현재 page

  // 달력
  const [date, setDate] = useState('');

  // 선택한 수납정보 담고있는 거
  var accDetailset = (res) => {
    setAccDetail(res);
    console.log("set");
  }

  // 달력에서 선택한 값 담아주는거
  const handleDate = Idate => {
    setDate(Idate);
    setReload(!reload);
    setNowPage(1);
    console.log(reload);
  };

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));

  // 달력에서 받은 날짜 형변환
  var getDate = (date) => date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + "-" + date.getMinutes();

  var getAcceptanceList = (num) => {
    var date2 = new Date(date);
    fetch(`http://localhost:8081/acceptance/${status}/${date == '' ? '9999-12-31' : getDate(date2)}/${search == '' ? 'notSearch' : search}/${num}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAcceptance(res);
        setAccDetail(res[0]);
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

  useEffect(() => {
    getAcceptanceList(nowPage);
  }, [status, reload]);


  // 수납 상태 변경
  var updateStatus = (no) => {
    fetch(`http://localhost:8081/acceptance/${no}`, {
      method: "put",
      // res에 결과가 들어옴
    }).then((res) => res.text())
      .then((res) => {
        if (res == 'success') {
          alert("수납 완료되었습니다");
          setReload(!reload);
          setAccDetail([]);
        } else {
          alert("실패");
        }
      }
      );
  }

  //검색창
  const inputSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색 엔터키 이벤트
  function enterkey(e) {
    e.preventDefault();

    if (window.event.keyCode == 13) {
      setNowPage(1);
      getAcceptanceList(1);

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
                <Row>
                  {/* 좌측 테이블 */}
                  {/* 좌측 상단 - 카테고리, 검색, 달력 */}
                  <Col xl='6'>
                    <CardHeader className="border-0">
                      <Row>
                        <Col md='12'>
                          {status == 1 ? <>
                            <Button color="primary" size='sm' type="button" onClick={e => {
                              e.preventDefault()
                              setStatus("1");
                              setTableIndex(1);
                            }}>
                              수납 전
                            </Button>
                            <Button color="primary" size='sm' outline type="button" onClick={e => {
                              e.preventDefault();
                              setStatus("2");
                              setTableIndex(1);
                            }}>
                              수납 완료
                            </Button></>
                            : <>
                              <Button color="primary" size='sm' outline type="button" onClick={e => {
                                e.preventDefault()
                                setStatus("1");
                                setTableIndex(1);
                              }}>
                                수납 전
                              </Button>
                              <Button color="primary" size='sm' type="button" onClick={e => {
                                e.preventDefault();
                                setStatus("2");
                              }}>
                                수납 완료
                              </Button></>
                          }
                          {/* 버튼 이걸로 싹다 갈아엎기 */}
                          {/* <Button onClick={() => updateStatus(accDetail.rec_no)}
                    color="success"
                    size="sm"
                    outline type="button">
                    수납
                  </Button> */}
                        </Col>
                      </Row>
                      <DivStyle5>
                        <Row>
                          <Col xl='7'>
                            {/* 검색창 */}
                            <InputBox
                              placeholder="Search"
                              type="text"
                              value={search}
                              onChange={inputSearch}
                              onKeyUp={(e) => enterkey(e)}
                            />
                          </Col>
                          <Col xl='5'>
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
                      </DivStyle5>

                    </CardHeader>
                    {/* 좌측 테이블 body */}
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        {/* 테이블 헤더 이름 */}
                        <tr>
                          {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                          <th scope="col" />
                        </tr>
                      </thead>

                      <tbody>
                        {acceptance.map(function (res) {
                          return <TrStyle isSelected={res.row_no == tableIndex} onClick={() => {
                            accDetailset(res)
                            setTableIndex(res.row_no);
                          }}>
                            <th scope="row">
                              {/* no */}
                              <span className="mb-0 text-sm">
                                {res.row_no}
                              </span>
                            </th>
                            {/* 이름 */}
                            <td>
                              {res.pat_name}
                            </td>
                            {/* 나이 */}
                            <td>
                              {ssnToAge(res.pat_ssn)}
                            </td>
                            {/* 전화번호 */}
                            <td>
                              {res.pat_phone}
                            </td>
                            {/* 주민번호 */}
                            <td>
                              {res.pat_ssn}
                            </td>
                            {/* 증상 */}
                            <td>
                              {res.dis_name}
                            </td>
                            {/* 수납상태 */}
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                {res.rec_status == "1" ? <i className="bg-success" /> : <i className="bg-danger" />}
                                {res.rec_status == "1" ? '수납 대기' : '수납 완료'}
                              </Badge>
                            </td>
                            <td></td>
                          </TrStyle>
                        })}
                      </tbody>
                    </Table>
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
                                getAcceptanceList(page[0] - 5);
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
                                  getAcceptanceList(num);
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
                                getAcceptanceList(page[4] + 1);
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

                  </Col>

                  {/* 우측 body */}
                  {/* 우측 상단 카테고리 */}
                  <Col xl='6'>
                    <CardHeader className="border-0">
                      <Row>
                        <Col md='3'>
                          <Button color="primary" size="sm" type="button">
                            수납 상세 정보
                          </Button>
                        </Col>
                        <Col md='8'>
                          {/* 우측 상단 검색 / class 제외 navbar-search-dark */}
                        </Col>
                      </Row>
                    </CardHeader>
                    {/* 수납상세 */}
                    <Row>
                      <Col xl='11'>
                        {/* 초기 화면에서는 row_no 최상단 띄워줌 */}
                        <DivStyle>
                          {accDetail != null ?
                            <div>
                              <DivStylePatientName>
                                <Row><Col xl='2'><h3>환자 이름: </h3></Col>
                                  <h3>{accDetail.pat_name}</h3>
                                </Row>
                              </DivStylePatientName>
                              <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                  {/* 테이블 헤더 이름 */}
                                  <tr>
                                    {righttableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                                    <th scope="col" />
                                  </tr>
                                </thead>
                              </Table>
                              <Row>
                                <DivStyle3>
                                  <DivStyle4>
                                    <Row><Col xl='2'></Col><Col xl='5'>
                                      <DivStyle6> 진찰료 : </DivStyle6></Col>
                                      <DivStyle7> {accDetail.rec_price} 원</DivStyle7>
                                    </Row>
                                  </DivStyle4>
                                  <DivStyle4>
                                    <Row><Col xl='2'></Col><Col xl='5'>
                                      <DivStyle6>처치 및 수술료 : </DivStyle6></Col>
                                      <DivStyle7>{accDetail.pre_price} 원</DivStyle7>
                                    </Row>
                                  </DivStyle4>
                                  <DivStyle8>
                                    <Row><Col xl='2'></Col><Col xl='5'>
                                      <DivStyle6>총액 : </DivStyle6></Col>
                                      <DivStyle7>{accDetail.pre_price * 1 + accDetail.rec_price * 1} 원</DivStyle7>
                                    </Row>
                                  </DivStyle8>
                                  <DivStyle4>
                                    <Row><Col xl='2'></Col><Col xl='5'>
                                      <DivStyle6><h3>환자 부담 총액 : </h3></DivStyle6></Col>
                                      <DivStyle7><h3>{accDetail.pre_price * 1 + accDetail.rec_price * 1 * 0.4} 원</h3></DivStyle7>
                                    </Row>
                                  </DivStyle4>
                                </DivStyle3>
                                <DivStyleFooterBtn>
                                {status == '1' ?
                                  <Button onClick={() => updateStatus(accDetail.rec_no)}
                                    color="primary"
                                    type="button">
                                    수납
                                  </Button> :
                                  null
                                }
                                </DivStyleFooterBtn>

                              </Row>
                            </div>

                            : null}
                        </DivStyle>
                      </Col>
                      <Col xl='1'></Col>
                    </Row>
                  </Col>
                </Row>
                {/* <DivStyle2> */}
                <Row>

                  <Col xl='6'>
                    {/* 페이징 */}
                    
                    {/* <nav aria-label="...">
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
                                getAcceptanceList(page[0] - 5);
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
                                console.log(pageInfo);
                                if (num <= pageInfo[0]) {
                                  setNowPage(num);
                                  getAcceptanceList(num);
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
                                getAcceptanceList(page[4] + 1);
                              }
                            }}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav> */}
                  </Col>
                  <Col xl='3'></Col>
                  <Col xl='3'>
                                {/* {status == '1' ?
                                  <Button onClick={() => updateStatus(accDetail.rec_no)}
                                    color="primary"
                                    type="button">
                                    수납
                                  </Button> :
                                  null
                                } */}

                  </Col>
                </Row>
                {/* </DivStyle2> */}
              </DivStyle>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AcceptanceTable2;