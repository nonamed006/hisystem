import React, { useRef, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
  Table
} from "reactstrap";
import styled from "styled-components";
import Reservation from "views/page/Reservation";
import ReactDatetime from "react-datetime";

const DivStyle = styled.div`
    height: 600px;
`;

const DivStyle2 = styled.div`
  height: 300px;
	//width: 90%;
  overflow: auto;
`;

const DivStyle4 = styled.div`
  height: 300px;
	//width: 90%;

`;

const DivStyle3 = styled.div`
  width: 100%;
`


var patientList = [];
var userDoctorList = [];

(() => {
  fetch(`http://localhost:8081/patient/getall`, {
    method: "get",
  }).then((res) => res.json())
    .then((res) => {
      patientList = res;
    });
})();

(() => {
  fetch(`http://localhost:8081/receipt/findDoctor`, {
    method: "get",
  }).then((res) => res.json())
    .then((res) => {
      userDoctorList = res;
    });
})();

class ReservationAddModal2 extends React.Component {

  state = {
    defaultModal: false,
    isEnterkey: false,
    isNameValue: false,
    search: "",
    inSsnValue: "",
    inNameValue: "",
    inValue: "",
    inUser: "",
    patientInfo2: [],
    inDate: null,
    DateValue: null
  };

  reload = this.props.reload;
  setReload = this.props.setReload;
  getReservationList = this.props.getReservationList;
  nowPage = this.props.nowPage;
  setNowPage = this.props.setNowPage;

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
    this.setState({ isNameValue: false });
    this.setState({ isEnterkey: false });
    this.setState({ search: "" });
    this.setState({ inSsnValue: "" });

  };

  tableTitle = ['환자이름', '주민번호', '전화번호'];

  // 접수 위한 함수
  pushReceipt = () => {

    if(this.state.inValue == ''){
      alert('증상을 입력해주세요');
    }
    else{
    
    let receipt = {
      patient_no: this.state.patientInfo2.no,
      remark: this.state.inValue,
      rev_date: this.state.inDate,
      user_doctor_no: this.state.inUser
    }
    this.setState({ inValue: ""});
    this.setState({ inSsnValue: ""});
    this.setState({ search: ""});

    fetch(`http://localhost:8081/user/reservation`, {
      method: "post",
      headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': localStorage.getItem("Authorization")
      },
      body: JSON.stringify(receipt)
    }).then((res) => res.text())
      .then((res) => {
        if (res == 'success') {
          // res에 따라 성공하면 리스트 리셋

          //this.setReload(!this.reload);
          this.getReservationList(1);
          this.setNowPage(1);
          alert("예약접수 되었습니다.");
        } else {
          alert("예약 실패하였습니다.");
          console.log(receipt);
        }
      }
      );
    }
  }

  // 검색값 onchange
  inputSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  // 증상 onchange
  inputRemark = (e) => {
    this.setState({ inValue: e.target.value });
  }

  patientInfo = (res) => {
    this.setState({ patientInfo2: res });
  }
  // 검색창 엔터키 눌렀을때 이벤트
  enterkey = (e) => {
    e.preventDefault();

    if (window.event.keyCode == 13) {
      this.setState({ isEnterkey: !this.state.isEnterkey });
      this.setState({ isNameValue: !this.state.isNameValue });
      this.setState({ inSsnValue: "" });
    }
  };

  // 검색후 환자 선택시 input창에 값 넣어줌
  inputinfo = (ssn, name) => {
    this.setState({ isNameValue: !this.state.isNameValue });
    this.setState({ isEnterkey: !this.state.isEnterkey });
    this.setState({ inSsnValue: ssn, search: name });
  };

  // 날짜 받기
  handleDate = Idate => {
    this.date2 = new Date(Idate);
    this.setState({ inDate: this.getDate(this.date2) });
  };
  // 달력에서 받은 날짜 형변환
  getDate = (date) => date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

  // 셀렉트로 의사 선택한 값 받기
  handleSelect = (e) => {
    this.setState({ inUser: e.target.value });
    console.log(e.target.value);
  };



  render() {
    return (
      <>
        <Row>
          <Col md="4" />
          <Col md="8">
            {/* 버튼 디자인 - 버튼 이름 */}
            <Button
              block
              className="mb-3"
              color="primary"
              type="button"
              onClick={() => this.toggleModal("defaultModal")}
            >
              예약 접수
            </Button>
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              <DivStyle>
                <div className="modal-header">
                  <h3 className="modal-title" id="modal-title-default">
                    {/*제목넣기 */}
                    예약 접수
                  </h3>
                </div>

                <div className="modal-body">

                  <Form role="form">
                    <Row>
                      <Col xl='5'>
                        {/* 이름으로 검색 */}
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                              </InputGroupText>
                            </InputGroupAddon>

                            <Input autofocus="autofocus"
                              value={this.state.search}
                              placeholder="이름으로 검색하세요"
                              type="text"
                              // ref = {searchName}
                              onChange={(e) => this.inputSearch(e)}
                              onKeyUp={(e) => this.enterkey(e)}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col xl='7'>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={this.state.inSsnValue == '' ? '' : this.state.inSsnValue}
                              placeholder="주민번호"
                              type="text"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col xl='12'>
                        {/* 선택하면 화면바뀌게 */}
                        {this.state.isNameValue && this.state.isEnterkey == true ?
                          <>
                          <DivStyle4>
                            <DivStyle3>
                            <FormGroup>
                              <Row>
                                <Col xl='5'>
                                  {/* 원하는 의사 선택 */}
                                  <InputGroup className="input-group-alternative">
                                    <select className="custom-select d-block w-100"
                                      onChange={(e) => {
                                        this.handleSelect(e);
                                      }}
                                    >
                                      <option value=''>의사를 선택하세요</option>
                                      {userDoctorList.map(function (res) {
                                        return <option value={res.no}>{res.name}</option>
                                      })}
                                    </select>
                                  </InputGroup>
                                </Col>
                                <Col xl='7'>
                                  <InputGroup className="input-group-alternative">
                                    {/* 아이콘 */}
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="ni ni-calendar-grid-58" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    {/* 달력 input */}
                                    <ReactDatetime
                                      onChange={(e) => this.handleDate(e)}
                                      value={this.state.DateValue}
                                      inputProps={{
                                        placeholder: "날짜를 선택하세요"
                                      }}
                                      dateFormat="YYYY-MM-DD"
                                      timeFormat="HH:mm"
                                    // timeFormat={false}
                                    />
                                  </InputGroup>
                                </Col>
                              </Row>
                            </FormGroup>
                              <FormGroup>
                                <InputGroup className="input-group-alternative">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    value={this.state.inValue}
                                    placeholder="증상을 입력하세요"
                                    type="textarea"
                                    rows="8"
                                    onChange={(e) => this.inputRemark(e)} />
                                </InputGroup>
                              </FormGroup>
                              </DivStyle3>
                            </DivStyle4>
                          </>
                          :
                          <DivStyle2>
                            <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                                {/* 테이블 헤더 이름 */}
                                <tr>
                                  {this.tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                                  <th scope="col" />
                                </tr>
                              </thead>
                              <tbody>
                                {patientList.map(function (res) {
                                  if (this.state.search != '' && res.name.includes(this.state.search)) {
                                    return <tr
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.inputinfo(res.ssn, res.name);
                                        this.patientInfo(res);
                                      }}
                                    >
                                      {/* 이름 */}
                                      <td>
                                        {res.name}
                                      </td>
                                      {/* 주민번호 */}
                                      <td>
                                        {res.ssn}
                                      </td>
                                      {/* 전화번호 */}
                                      <td>
                                        {res.phone}
                                      </td>
                                    </tr>
                                  }
                                }.bind(this))}
                              </tbody>
                            </Table>
                          </DivStyle2>
                        }
                      </Col>
                    </Row>
                  </Form>

                </div>

                <div className="modal-footer">
                  <Button
                    color="success"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      this.pushReceipt();
                      this.toggleModal("defaultModal");
                    }}
                  >
                    접수
                  </Button>

                </div>
              </DivStyle>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default ReservationAddModal2;