/*eslint-disable*/
import InputBox from 'components/input/InputBox';
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
  Badge,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button
} from "reactstrap";
import styled from 'styled-components';

const h = window.innerHeight * 0.7;
const DivStyle = styled.div`
  height: ${h}px;
`;
// const DivStylePaging = styled.div`
//   position : absolute;
//   top: 510px;
//   left: 365px
  
// `;

//페이징용 높낮이
const pw = window.innerWidth * 0.23;
  const ph = window.innerHeight * 0.55;
  const DivStyleFooterPaging = styled.div`
  position : absolute;
  top: ${ph}px;
  left: ${pw}px;
  `;


const DivStyleFooterBtn = styled.div`
position : absolute;
top: 590px;
left: 465px

`;

const TrStyle = styled.tr`
  cursor: pointer;
  ${({ isSelected }) => {
    return isSelected ? `background-color: #e3fafc;` : null;
  }}
`;

const DivStyle1 = styled.div`
	overflow: auto;
  width : 100%;
  height : 350px;
`;

const DiagnosisTable = (props) => {

  const tableTitle = ['no', '환자이름', '나이', '성별', '증상', '상태']; // 테이블 헤더
  const tableTitle2 = ['방문일', '소견', '증상', '처방약', '처치', '처지상세']; // 테이블 헤더
  const tableTitle3 = ['주민번호', '주소', '폰', '보험여부', '메모',]; // 테이블 헤더
  const tableTitle4 = [['질병명(한글)', '질병명(영어)'], ['약명', '제조회사', '주성분', '첨가물', 'origin'], ['처방내용', '처방상세내용', '가격']]; // 테이블 헤더
  const sendAlarm = props.sendAlarm;

  // ######### State ##########
  const [user, setUser] = useState(null);
  const [page, setPage] = useState([]);         // page button => ex) 1, 2, 3, 4, 5 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1);    // 현재 선택된 page
  const [search, setSearch] = useState('');     // 검색어 
  const [reload, setReload] = useState(false);  // 리로드 체크
  const [patients, setPatients] = useState([]); // 테이블에 들어가는 환자 list

  const [diagnosis, setDiagnosis] = useState([]); // 우측 테이블에 들어가는 과거 진료 list
  const [patient, setPatient] = useState([]);     // 우측 테이블에 들어가는 환자 정보

  const [leftTableSatus, setLeftTableSatus] = useState('진료중'); // 좌측 테이블 상태 변수 (진료대기, 진료중, 진료완료)
  const [rightTableSatus, setRightTableSatus] = useState('진료기록');  // 우측 테이블 상태 변수 (진료, 진료기록)

  const [tableIndex, setTableIndex] = useState(1); // 선택된 행

  // ##### 진료 관련 State #####
  // ##### 진료 관련 State #####
  // ##### 진료 관련 State #####
  var objIncludeKey = (objArray, value, no) => {
    // no 1 질병 2 약 3 처치
    if (no == 1) return objArray.findIndex(v => v.dis_kr_name == value) != -1 || objArray.findIndex(v => v.dis_en_name == value) != -1;
    if (no == 2) return objArray.findIndex(v => v.med_name == value) != -1;
    if (no == 3) return objArray.findIndex(v => v.pre_desc == value) != -1;
  };

  var [focus, setFocus] = useState();

  const [doctorRemark, setDoctorRemark] = useState('');
  var onChangeDoctorRemark = (e) => {
    setDoctorRemark(e.target.value);
  }
  // 증상
  const [diseasesList, setDiseasesList] = useState([]);
  const [diseases, setDiseases] = useState({
    value: '',
    enter: false,
    success: false
  });
  // 검색창
  var inputDiseases = (e) => {
    console.log('질병 onchange');
    setDiseases({
      //...diseases,
      value: e.target.value,
      enter: false,
      success: false
    });
  };
  // 검색 엔터키 이벤트
  var enterDiseases = (e) => {
    e.preventDefault();
    if (window.event.keyCode == 13) {
      console.log('질병 enter');
      setDiseases({
        //...diseases,
        value: e.target.value,
        enter: true,
        success: objIncludeKey(diseasesList, e.target.value, 1)
      });
    }
  }
  // 약
  const [medicineList, setMedicineList] = useState([]);
  const [medicine, setMedicine] = useState({
    value: '',
    enter: false,
    success: false
  });
  // 검색창
  var inputMedicine = (e) => {
    setMedicine({
      value: e.target.value,
      enter: false,
      success: false
    });
  };
  // 검색 엔터키 이벤트
  var enterMedicine = (e) => {
    e.preventDefault();
    if (window.event.keyCode == 13) {
      setMedicine({
        value: e.target.value,
        enter: true,
        success: objIncludeKey(medicineList, e.target.value, 2)
      });
    }
  }
  // 처방
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [prescription, setPrescription] = useState({
    value: '',
    enter: false,
    success: false
  });
  // 검색창
  var inputPrescription = (e) => {
    setPrescription({
      value: e.target.value,
      enter: false,
      success: false
    });
  };
  // 검색 엔터키 이벤트
  var enterPrescription = (e) => {
    e.preventDefault();
    if (window.event.keyCode == 13) {
      setPrescription({
        value: e.target.value,
        enter: true,
        success: objIncludeKey(prescriptionList, e.target.value, 3)
      });
    }
  }
  // 조회 함수
  var getDiaInfo = (no) => {
    fetch(`http://localhost:8081/diagnosis/info/${no}`, {
      method: "get",
    }).then((res) => res.json())
      .then((res) => {
        console.log('diainfo', res);
        if (no == 1) setDiseasesList(res);
        if (no == 2) setMedicineList(res);
        if (no == 3) setPrescriptionList(res);
      });
  };
  // ##### 진료 관련 State #####
  // ##### 진료 관련 State #####
  // ##### 진료 관련 State #####

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));

  // 검색창
  var inputSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색 엔터키 이벤트
  var enterkey = (e) => {
    e.preventDefault();
    if (window.event.keyCode == 13) {
      setNowPage(1);
      getPatientList(1, search, leftTableSatus);
    }
  }

  useEffect(() => {
    if (diseasesList.length == 0) getDiaInfo(1);
    if (diseasesList.length == 0) getDiaInfo(2);
    if (diseasesList.length == 0) getDiaInfo(3);
    getPatientList(nowPage, search, leftTableSatus);

    if (user == null) {
      fetch("http://localhost:8081/user", {
        method: "get",
        headers: {
          'Authorization': localStorage.getItem("Authorization")
        }
      }).then((res) => res.json())
        .then((res) => {
          setUser(res);
        });
    }
  }, [reload]);

  // 접수현황 조회 함수
  var getPatientList = (page, name, leftTableSatus) => {
    //좌측 테이블 상태 변수 (진료대기, 진료중, 진료완료)
    let status1;
    let status2;
    if (leftTableSatus == '진료대기') {
      status1 = 1;
      status2 = 4;
    } else if (leftTableSatus == '진료중') {
      status1 = 2;
      status2 = 0;
    } else if (leftTableSatus == '진료완료') {
      status1 = 3;
      status2 = 0;
    }

    fetch(`http://localhost:8081/receipt/${status1}/${status2}/${name == '' ? 'notSearch' : name}/${page}`, {
      method: "get",
    }).then((res) => res.json())
      .then((res) => {
        console.log('###', res);
        console.log(page, name, leftTableSatus);
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
        if (res[0] != null && res[0] != undefined && res[0] != '') {
          getBeforeDiagnosisList(res[0]?.no);
          getPatient(res[0]?.patient_no);
        } else {
          setDiagnosis([]);
          setPatient([]);
        }
      });
  };

  // 환자 과거 진료내역 조회 함수
  var getBeforeDiagnosisList = (userNo) => {
    fetch(`http://localhost:8081/diagnosis/${userNo}`, {
      method: "get",
    }).then((res) => res.json())
      .then((res) => {
        console.log('###', res);
        setDiagnosis(res);
      });
  };

  // 우측 테이블 환자 정보 가져오는 함수
  var getPatient = (userNo) => {
    fetch(`http://localhost:8081/patient/${userNo}`, {
      method: "get",
    }).then((res) => res.json())
      .then((res) => {
        console.log('# 우측 테이블 환자 정보 #', res);
        setPatient(res);
      });
  };

  // 진료 등록
  var insertDiagnosis = (userNo) => {
    let diagnosisObject = {
      remark: doctorRemark,
      reservation_no: patients[tableIndex - 1].no,
      diseases: diseasesList[diseasesList.findIndex(v => v.dis_kr_name == diseases.value)].dis_code,
      medicine: medicineList[medicineList.findIndex(v => v.med_name == medicine.value)].med_code,
      prescription: prescriptionList[prescriptionList.findIndex(v => v.pre_desc == prescription.value)].pre_code,
      patient_no: patients[tableIndex - 1].patient_no,
    }

    fetch("http://localhost:8081/user/diagnosis", {
      method: "POST",
      body: JSON.stringify(diagnosisObject),
      headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': localStorage.getItem("Authorization")
      }
    }).then(res => {
      if (res.text = "success") {
        // userNo, patientNo, patientName, message
        sendAlarm(user.no, diagnosisObject.patient_no, patients[tableIndex - 1].name, '진료 끝났습니다');
        setLeftTableSatus("진료완료");
        getPatientList(nowPage, search, '진료완료');
        setTableIndex(1);
        setDiseases({
          value: '',
          enter: false,
          success: false
        });
        setMedicine({
          value: '',
          enter: false,
          success: false
        });
        setPrescription({
          value: '',
          enter: false,
          success: false
        });
        setDoctorRemark('');
        setRightTableSatus('진료기록');
        setFocus('');
        return "진료 완료되었습니다";
      }
      else return "실패";
    }).then(res => {
      alert(res);
    });
  };

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">

            <Card className="shadow">
              <DivStyle>
                {/* ######### Table Header Strat ########## */}
                {/* ######### Table Header Strat ########## */}
                <CardHeader className="border-0">
                  <Row>
                    {/* ##### ##### Table 상단 좌측(6) ##### ##### */}
                    {/* ##### ##### Table 상단 좌측(6) ##### ##### */}
                    <Col xl='5'>
                      <Row> {/* 테이블 좌측 상단 접수상태 탭 */}
                        <Col xl='7'>
                          {leftTableSatus == '진료대기' ? <>
                            <Button color="primary" type="button" size='sm' onClick={e => {
                              e.preventDefault(); setLeftTableSatus("진료대기");
                              getPatientList(nowPage, search, '진료대기'); setTableIndex(1);
                              // setDiagnosis([]); setPatient([]);
                            }}>
                              진료 대기
                            </Button>
                            <Button color="primary" outline type="button" size='sm' onClick={e => {
                              e.preventDefault(); setLeftTableSatus("진료중");
                              getPatientList(nowPage, search, '진료중'); setTableIndex(1);
                              //setDiagnosis([]); setPatient([]);
                            }}>
                              진료중
                            </Button>
                            <Button color="primary" outline type="button" size='sm' onClick={e => {
                              e.preventDefault(); setLeftTableSatus("진료완료");
                              getPatientList(nowPage, search, '진료완료'); setTableIndex(1);
                              //setDiagnosis([]); setPatient([]);
                            }}>
                              진료 완료
                            </Button> </>
                            // ##### 진료대기 end #####
                            // ##### 진료대기 end #####
                            : leftTableSatus == '진료중' ? <>
                              <Button color="primary" outline type="button" size='sm' onClick={e => {
                                e.preventDefault(); setLeftTableSatus("진료대기");
                                getPatientList(nowPage, search, '진료대기'); setTableIndex(1);
                                // setDiagnosis([]); setPatient([]);
                              }}>
                                진료 대기
                              </Button>
                              <Button color="primary" type="button" size='sm' onClick={e => {
                                e.preventDefault(); setLeftTableSatus("진료중");
                                getPatientList(nowPage, search, '진료중'); setTableIndex(1);
                                //setDiagnosis([]); setPatient([]);
                              }}>
                                진료중
                              </Button>
                              <Button color="primary" outline type="button" size='sm' onClick={e => {
                                e.preventDefault(); setLeftTableSatus("진료완료");
                                getPatientList(nowPage, search, '진료완료'); setTableIndex(1);
                                //setDiagnosis([]); setPatient([]);
                              }}>
                                진료 완료
                              </Button> </>
                              // ##### 진료중 end #####
                              // ##### 진료중 end #####
                              : <>
                                <Button color="primary" outline type="button" size='sm' onClick={e => {
                                  e.preventDefault(); setLeftTableSatus("진료대기");
                                  getPatientList(nowPage, search, '진료대기'); setTableIndex(1);
                                  // setDiagnosis([]); setPatient([]);
                                }}>
                                  진료 대기
                                </Button>
                                <Button color="primary" outline type="button" size='sm' onClick={e => {
                                  e.preventDefault(); setLeftTableSatus("진료중");
                                  getPatientList(nowPage, search, '진료중'); setTableIndex(1);
                                  //setDiagnosis([]); setPatient([]);
                                }}>
                                  진료중
                                </Button>
                                <Button color="primary" type="button" size='sm' onClick={e => {
                                  e.preventDefault(); setLeftTableSatus("진료완료");
                                  getPatientList(nowPage, search, '진료완료'); setTableIndex(1);
                                  //setDiagnosis([]); setPatient([]);
                                }}>
                                  진료 완료
                                </Button> </>
                          }


                          {/* <Badge color="info" href="#pablo" onClick={e => {
                          e.preventDefault(); setLeftTableSatus("진료대기");
                          getPatientList(nowPage, search, '진료대기'); setTableIndex(1);
                          // setDiagnosis([]); setPatient([]);
                        }}>
                          접수 현황
                        </Badge> &nbsp;
                        <Badge color="info" href="#pablo" onClick={e => {
                          e.preventDefault(); setLeftTableSatus("진료중");
                          getPatientList(nowPage, search, '진료중'); setTableIndex(1);
                          //setDiagnosis([]); setPatient([]);
                        }}>
                          진료중
                        </Badge> &nbsp;
                        <Badge color="info" href="#pablo" onClick={e => {
                          e.preventDefault(); setLeftTableSatus("진료완료");
                          getPatientList(nowPage, search, '진료완료'); setTableIndex(1);
                          //setDiagnosis([]); setPatient([]);
                        }}>
                          진료 완료
                        </Badge> */}

                        </Col> {/* 테이블 좌측 상단 검색창 */}
                        <InputBox
                          placeholder="Search"
                          type="text"
                          value={search}
                          onChange={inputSearch}
                          onKeyUp={(e) => enterkey(e)}
                        />
                      </Row>
                    </Col>
                    {/* ##### ##### Table 상단 우측(6) ##### ##### */}
                    {/* ##### ##### Table 상단 우측(6) ##### ##### */}
                    <Col xl='7'>
                      <Row> {/* 테이블 좌측 상단 접수상태 탭 */}
                        <Col xl='11'>
                          {rightTableSatus == '진료' ? <>

                            <Button color="primary" type="button" size='sm' outline onClick={e => { e.preventDefault(); setRightTableSatus("진료기록"); }}>
                              진료 기록
                            </Button>
                            {leftTableSatus == '진료중' && (user.role == 999 || user.role == 4) ?
                              <Button color="primary" type="button" size='sm' onClick={e => { e.preventDefault(); setRightTableSatus("진료"); }}>
                                진료 작성
                              </Button> : null
                            }
                          </>
                            : <>
                              <Button color="primary" type="button" size='sm' onClick={e => { e.preventDefault(); setRightTableSatus("진료기록"); }}>
                                진료 기록
                              </Button>
                              {leftTableSatus == '진료중' && (user?.role == 999 || user?.role == 4) ?
                                <Button color="primary" type="button" size='sm' outline onClick={e => { e.preventDefault(); setRightTableSatus("진료"); }}>
                                  진료 작성
                                </Button> : null
                              }
                            </>
                          }
                          {/* <Badge color="info" href="#pablo" onClick={e => { e.preventDefault(); setRightTableSatus("진료"); }}>
                          진료
                        </Badge> &nbsp;
                        <Badge color="info" href="#pablo" onClick={e => { e.preventDefault(); setRightTableSatus("진료기록"); }}>
                          진료기록
                        </Badge> */}

                        </Col>
                        <Col xl='1'>
                          {leftTableSatus == '진료중' && rightTableSatus == '진료' ?
                            <Button
                              onClick={insertDiagnosis}
                              color="primary" size="sm" type="button">
                              등록
                            </Button>
                            : null
                          }
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardHeader>


                {/* ######### Table Start ########## */}
                {/* ######### Table Start ########## */}
                <Row>
                  {/* ######### Table 좌측 Body ########## */}
                  {/* ######### Table 좌측 Body ########## */}
                  <Col xl='5'>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                          {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody> {/* 테이블 body */}
                        {patients.map(function (res) {
                          return <TrStyle isSelected={res.row_no == tableIndex} onClick={() => {
                            getBeforeDiagnosisList(res.patient_no);
                            getPatient(res.patient_no);
                            setTableIndex(res.row_no);
                          }}>
                            <td>{res.row_no}</td> {/* no */}
                            <th scope="row"> <span className="mb-0 text-sm"> {res.name} </span>  </th> {/* 환자이름 */}
                            <td>{ssnToAge(res.ssn)}</td> {/* 나이 */}
                            <td>{res.gender}</td> {/* 성별 */}
                            <td>{res.remark}</td> {/* 증상 */}
                            <td>
                              {
                                leftTableSatus == '진료대기' ?
                                  <Badge color="" className="badge-dot mr-4">
                                    {res.status == '4' ? <i className="bg-yellow" /> : <i className="bg-info" />}
                                    {res.status == '4' ? '예약-방문대기중' : '대기중'}
                                  </Badge>
                                  :
                                  leftTableSatus == '진료중' ?
                                    <Badge color="" className="badge-dot mr-4">
                                      <i className="bg-success" /> 진료중
                                    </Badge>
                                    :
                                    <Badge color="" className="badge-dot mr-4">
                                      <i className="bg-danger" /> 진료완료
                                    </Badge>
                              }
                            </td> {/* 상태 */}
                            <td />
                          </TrStyle>
                        })}
                      </tbody>
                    </Table>
                    {/* ######### 페이징 ########## */}
                    <CardFooter className="py-7">
                      {/* <Col xl='5'> */}
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
                                    getPatientList(page[0] - 5, search, leftTableSatus);
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
                                      getPatientList(num, search, leftTableSatus);
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
                                    getPatientList(page[4] + 1, search, leftTableSatus);
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
                      {/* </Col> */}
                    </CardFooter>
                  </Col>
                  {/* ######### Table 우측 Body ########## */}
                  {/* ######### Table 우측 Body ########## */}
                  <Col xl='7'>
                    {
                      rightTableSatus == '진료' ?
                        // <DivStyle>
                        <div>
                          <Row>
                            <Col xl='11'>
                              <Input
                                id="exampleFormControlTextarea1"
                                placeholder="Please enter your doctor's opinion ..."
                                rows="3"
                                type="textarea"
                                value={doctorRemark}
                                onChange={(e) => onChangeDoctorRemark(e)}
                              />
                            </Col>
                            <Col xl='1'></Col>
                          </Row>
                          <br />
                          <Row>
                            <Col md="3">
                              {!diseases.enter ?
                                <FormGroup>
                                  <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="ni ni-zoom-split-in" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                      placeholder="질병을 입력하세요"
                                      type="text"
                                      value={diseases.value}
                                      onChange={inputDiseases}
                                      onKeyUp={(e) => enterDiseases(e)}
                                      onFocus={() => { if (focus != 1) setFocus(1); }}
                                    />
                                  </InputGroup>
                                </FormGroup>
                                : diseases.success ?
                                  <FormGroup className="has-success">
                                    <Input
                                      className="is-valid"
                                      //placeholder="Success"
                                      type="text"
                                      value={diseases.value}
                                      onChange={inputDiseases}
                                      onKeyUp={(e) => enterDiseases(e)}
                                    />
                                  </FormGroup>
                                  :
                                  <FormGroup className="has-danger">
                                    <Input
                                      className="is-invalid"
                                      //placeholder="Not Exist"
                                      type="email"
                                      value={diseases.value}
                                      onChange={inputDiseases}
                                      onKeyUp={(e) => enterDiseases(e)}
                                    />
                                  </FormGroup>
                              }
                            </Col>
                            {/* <Col md="8"></Col> */}
                            <Col md="3">
                              {!medicine.enter ?
                                <FormGroup>
                                  <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="ni ni-zoom-split-in" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                      placeholder="약을 입력하세요"
                                      type="text"
                                      value={medicine.value}
                                      onChange={inputMedicine}
                                      onKeyUp={(e) => enterMedicine(e)}
                                      onFocus={() => { if (focus != 2) setFocus(2); }}
                                    />
                                  </InputGroup>
                                </FormGroup>
                                : medicine.success ?
                                  <FormGroup className="has-success">
                                    <Input
                                      className="is-valid"
                                      //placeholder="Success"
                                      type="text"
                                      value={medicine.value}
                                      onChange={inputMedicine}
                                      onKeyUp={(e) => enterMedicine(e)}
                                    />
                                  </FormGroup>
                                  :
                                  <FormGroup className="has-danger">
                                    <Input
                                      className="is-invalid"
                                      //placeholder="Not Exist"
                                      type="email"
                                      value={medicine.value}
                                      onChange={inputMedicine}
                                      onKeyUp={(e) => enterMedicine(e)}
                                    />
                                  </FormGroup>
                              }
                            </Col>
                            {/* <Col md="8"></Col> */}
                            <Col md="5">
                              {!prescription.enter ?
                                <FormGroup>
                                  <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="ni ni-zoom-split-in" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                      placeholder="처방을 입력하세요"
                                      type="text"
                                      value={prescription.value}
                                      onChange={inputPrescription}
                                      onKeyUp={(e) => enterPrescription(e)}
                                      onFocus={() => { if (focus != 3) setFocus(3); }}
                                    />
                                  </InputGroup>
                                </FormGroup>
                                : prescription.success ?
                                  <FormGroup className="has-success">
                                    <Input
                                      className="is-valid"
                                      //placeholder="Success"
                                      type="text"
                                      value={prescription.value}
                                      onChange={inputPrescription}
                                      onKeyUp={(e) => enterPrescription(e)}
                                    />
                                  </FormGroup>
                                  :
                                  <FormGroup className="has-danger">
                                    <Input
                                      className="is-invalid"
                                      //placeholder="Not Exist"
                                      type="email"
                                      value={prescription.value}
                                      onChange={inputPrescription}
                                      onKeyUp={(e) => enterPrescription(e)}
                                    />
                                  </FormGroup>
                              }
                            </Col>
                            <Col md="1"></Col>
                            {/* <Col md="8"></Col> */}
                          </Row>
                          <Row>
                            <Col xl='11'>
                              <DivStyle1>
                                <Table className="align-items-center table-flush" responsive>
                                  <thead className="thead-light">

                                    <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                                      {focus == 1 ? // 질병에 커서
                                        tableTitle4[0].map(tableName => <th scope="col">{tableName}</th>)
                                        :
                                        focus == 2 ? // 약에 커서
                                          tableTitle4[1].map(tableName => <th scope="col">{tableName}</th>)
                                          :
                                          focus == 3 ? // 처방에 커서
                                            tableTitle4[2].map(tableName => <th scope="col">{tableName}</th>)
                                            :
                                            null
                                        //tableTitle4[3].map(tableName => <th scope="col">{tableName}</th>)
                                      }
                                      <th scope="col" />
                                    </tr>

                                  </thead>
                                  <tbody> {/* 테이블 body */}
                                    {focus == 1 ? // 질병에 커서
                                      diseasesList.map(res => {
                                        if (res.dis_kr_name.includes(diseases.value)) {
                                          return <TrStyle
                                            onClick={() => setDiseases({
                                              value: res.dis_kr_name,
                                              enter: true,
                                              success: true
                                            })}>
                                            {/* <td>{res.dis_code}</td>  */}
                                            {/* 질병 */}
                                            <td>{res.dis_kr_name.length > 30 ? res.dis_kr_name.substring(0, 30) : res.dis_kr_name}</td> {/* 질병 한글 */}
                                            <td>{res.dis_en_name}</td> {/* 질병 영어 */}
                                          </TrStyle>
                                        }
                                      })
                                      : focus == 2 ? // 약에 커서
                                        medicineList.map(res => {
                                          if (res.med_name.includes(medicine.value)) {
                                            return <TrStyle onClick={() => setMedicine({
                                              value: res.med_name,
                                              enter: true,
                                              success: true
                                            })}>
                                              {/* <td>{res.med_code}</td>  */}
                                              {/* 약 코드 */}
                                              <td>{res.med_name.length > 10 ? res.med_name.substring(0, 10) : res.med_name}</td> {/* 약 이름 */}
                                              <td>{res.med_company.length > 10 ? res.med_company.substring(0, 10) : res.med_company}</td> {/* 약 제조 회사 */}
                                              <td>{res.med_ingredient.length > 10 ? res.med_ingredient.substring(0, 10) : res.med_ingredient}</td> {/* 약 성분 */}
                                              <td>{res.med_additive.length > 10? res.med_additive.substring(0,10) : res.med_additive}</td> {/* 약 ? */}
                                              <td>{res.med_origin}</td> {/* 약 ? */}
                                              <td></td>
                                            </TrStyle>
                                          }
                                        })
                                        : focus == 3 ? // 처치에 커서
                                          prescriptionList.map(res => {
                                            if (res.pre_desc.includes(prescription.value)) {
                                              return <TrStyle onClick={() => setPrescription({
                                                value: res.pre_desc,
                                                enter: true,
                                                success: true
                                              })}>
                                                {/* <td>{res.pre_code}</td>  */}
                                                {/* 처치 코드 */}
                                                {/* <td>{res.pre_date}</td>  */}
                                                {/* 처치 날짜 ? */}
                                                <td>{res.pre_desc}</td> {/* 처치 내용 */}
                                                <td>{res.pre_desc_detail}</td> {/* 처치 내용 상세 */}
                                                <td>{res.pre_price}</td> {/* 처치 가격 */}
                                              </TrStyle>
                                            }
                                          })
                                          :
                                          null
                                    }
                                  </tbody>
                                </Table>
                              </DivStyle1>
                            </Col>
                            <Col xl='1'></Col>
                          </Row>

                          {/* </DivStyle> */}
                        </div>
                        :
                        <div>
                          {/* <DivStyle>  */}
                          {/* 환자 진료기록 div */}
                          <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                              <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                                {tableTitle3.map(tableName => <th scope="col">{tableName}</th>)}
                                <th scope="col" />
                              </tr>
                            </thead>
                            <tbody> {/* 테이블 body */}
                              <tr>
                                <td>{patient.ssn}</td> {/* 주민번호 */}
                                <td>{patient.addr}</td> {/* 주소 */}
                                <td>{patient.phone}</td> {/* 폰 */}
                                <td> {/* 보험여부 */}
                                  <Badge color="" className="badge-dot mr-4">
                                    {patient.insurance_yn == '가입' ? <i className="bg-success" /> : <i className="bg-danger" />}
                                    {patient.insurance_yn}
                                  </Badge>
                                </td>
                                <td>{patient.memo}</td> {/* 메모 */}
                              </tr>
                              <tr><td /><td /><td /><td /><td /><td /></tr>
                            </tbody>
                          </Table>
                          <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                              <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                                {tableTitle2.map(tableName => <th scope="col">{tableName}</th>)}
                                <th scope="col" />
                              </tr>
                            </thead>
                            <tbody> {/* 테이블 body */}
                              {diagnosis.map(function (res) {
                                return <tr>
                                  <td>{res?.dia_date.substring(0, 16)}</td> 
                                  {/* '방문일' */}
                                  <td>{res.dia_remark}</td> {/* '소견' */}
                                  <td>{res.dis_name}</td> {/* '증상' */}
                                  <td>{res.med_name}</td> {/* '처방약' */}
                                  <td>{res.pre_desc}</td> {/* '처치' */}
                                  <td>{res.pre_detail}</td> {/* '처지상세' */}
                                </tr>
                              })}
                            </tbody>
                          </Table>
                          {/* </DivStyle> */}
                        </div>
                    }
                  </Col>
                </Row>
                {/* ######### Table End ########## */}
                {/* ######### Table End ########## */}

              </DivStyle>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DiagnosisTable;