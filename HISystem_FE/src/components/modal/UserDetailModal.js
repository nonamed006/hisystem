/*eslint-disable*/
import React, { useState ,useEffect} from "react";
import DaumPostcode from "react-daum-postcode";
import addrApiModal from "assets/css/addrApiModal.css";


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";
import moment from "moment";
export default function ({ no, name, id, gender, role, phone, ssn, addr, reg_date, age, split_addr, split_zonecode, split_daddr, split_phone1, split_phone2, split_phone3, split_ssn1, split_ssn2, modalState, setModalState, reload, setReload }) {

  const [checkModalContent, setCheckModalContent] = useState({ isModify: false });
  const [postModal, setPostModal] = useState({ isOpen: false });
  // 토글 버튼 상태: 모달내용 변경확인용(상세보기<->정보수정)
  const changeModalContent = (e) => {
    setCheckModalContent(Object.assign({}, checkModalContent, { isModify: e.target.checked }))

  }
  const [updateUser, setUpdateUser] = useState({
    no: no,
    name: name,
    id: id,
    ssn: ssn,
    addr: addr,
    phone: phone,
    gender: gender,
    role: role,
    split_addr: split_addr,
    split_daddr: split_daddr,
    split_zonecode: split_zonecode,
    split_ssn1: split_ssn1,
    split_ssn2: split_ssn2,
    split_phone1: split_phone1,
    split_phone2: split_phone2,
    split_phone3: split_phone3
  });

  useEffect(() => {
    console.log("1")
    setUpdateUser(Object.assign({}, updateUser, {no, name, id, gender, role, phone, ssn, addr, reg_date, age, split_addr, split_zonecode, split_daddr, split_phone1, split_phone2, split_phone3, split_ssn1, split_ssn2, modalState, setModalState, reload, setReload }))
    console.log(updateUser)
  }, [checkModalContent.isModify]);


  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [isDetailAddress, setIsDetailAddress] = useState("");
  const [ssn1, setSsn1] = useState("")
  const [ssn2, setSsn2] = useState("")
  const [validSsn, setValidSsn] = useState(false);

  /**
   * 카카오 주소 api
   */
  const postCodeStyle = {
    display: "block",
    position: "absolute",
    // top: "",
    width: "400px",
    height: "500px",
    padding: "7px",
  };
  const handleComplete = (data) => {
    setPostModal({ isOpen: false });

    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    // setIsZoneCode(data.zonecode);
    // setIsAddress(fullAddress);
    setUpdateUser(Object.assign({}, updateUser, { split_addr: fullAddress, split_zonecode: split_zonecode }))


  };

  /**
   * 주소 입력 및 합치기
   */
  const onChangeInputAddr = (e) => {
    //  setUpdateUser(Object.assign({}, updateUser, { split_daddr: e.target.value}))

    //  setUpdateUser({split_detail: e.target.value});
    // setIsDetailAddress(e.target.value)
    // setUpdateUser(Object.assign({}, updateUser, {split_detail: e.target.value }))
    // setUpdateUser(Object.assign({}, updateUser, {split_detail : e.target.value}))
    setUpdateUser(Object.assign({}, updateUser, { addr: updateUser.split_zonecode + " " + updateUser.split_addr + e.target.value, split_daddr: e.target.value }))

    // if(isZoneCode !== "" && isAddress !== ""){
    //     setValidAddress(true)
    // }
  }


  ////////////////////////////////////////////////////////////////


  /**
   * 주민번호 입력 및 체크
   */

  // 주민번호 다음칸 이동
  function jumpSsn(e) {
    if (e.target.value.length >= 6) {
      document.getElementById("ssn2").focus()
    }
  }
  // 주민번호 합치기
  const onChangeInputSsn = (e) => {

    setUpdateUser(Object.assign({}, updateUser, { split_ssn2: e.target.value, ssn: updateUser.split_ssn1 + "-" + e.target.value }))

    let resultSsn = updateUser.split_ssn1 + e.target.value;

    // 10자 제한(validation)
    setValidSsn((resultSsn)?.length === 13);

    // setUpdateUser(Object.assign({}, updateUser, { ssn: resultSsn }))
  };


  /**
   * 전화번호 입력
   */

  // 전화번호 다음칸 이동
  function jumpPhone(e) {
    if (e.target.value.length >= 3) {
      document.getElementById("cellPhone2").focus()
    }
  }
  // 전화번호 다음칸 이동
  function jumpPhone2(e) {
    if (e.target.value.length >= 4) {
      document.getElementById("cellPhone3").focus()
    }
  }

  const onChangeInputPhone = (e) => {
    e.preventDefault()
    setUpdateUser(Object.assign({}, updateUser, { phone: updateUser.split_phone1 + "-" + updateUser.split_phone2 + "-" + e.target.value, split_phone3: e.target.value }))

  };

  // const test = (e) => {
  //   console.log(e.target.value)
  //   console.log(name)
  //   // setUpdateUser(Object.assign({}, updateUser, { name: e.target.value }))
  // }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const response = await fetch(`http://localhost:8081/admin/user/update`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });

    if (!response.ok) {
      console.log(response)
      throw `${response.status} ${response.statusText}`;
    }
    alert("수정 되었습니다.")
    setReload(!reload);
    const jsonResult = response.json;
  };

  function closeModal() {
    setModalState({ isOpen: false })
    // 수정하다가 완료안하고 모달창 껐을 때 수정한 내용 원래대로 원복
    if (checkModalContent.isModify === true) {
      setUpdateUser(Object.assign({}, updateUser, { name, id, ssn, addr, phone, gender, role }))
    }
    //직원 이름 클릭시 항상 상세보기 먼저나오게 설정
    setCheckModalContent({ isModify: false })
    // setTimeout(() => {

    // }, 200);

  }
  const onClickModify = (e) => {
    setModalState({ isOpen: false })
    handlerSubmit(e);

  }

  const formatDate = moment(reg_date, "YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD")


  return (
    <Modal
      className="modal-dialog-centered"
      size="m"
      isOpen={modalState.isOpen}
      toggle={closeModal}
    >
      {/* Default checked */}
      {/* <div class="custom-control custom-switch">
              <input type="checkbox" data-toggle="toggle" />                        
              <label class="custom-control-label" for="customSwitch1"></label>
          </div> */}


      {/* <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customSwitch1"
          onChange={changeModalContent}
        />
        <label className="custom-control-label" for="customSwitch1"></label>
      </div> */}
      <div class="btn-group btn-group-toggle" data-toggle="buttons" >
        <label class="btn btn-light">
          <input
            type="radio"
            name="jb-radio"
            id="jb-radio-1"
            onClick={(e) => setCheckModalContent(Object.assign({}, checkModalContent, { isModify: false }))}

          />상세보기
        </label>
        <label class="btn btn-light">
          <input
            type="radio"
            name="jb-radio"
            id="jb-radio-2"
            onClick={(e) => setCheckModalContent(Object.assign({}, checkModalContent, { isModify: true }))}

          /> 정보수정
        </label>

      </div>


      {
        (function () {
          if (checkModalContent.isModify === false) return (
            <React.Fragment>
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    {/* header 문구 */}
                    <div className="text-center text-muted mb-4">

                      <strong>직원 상세 보기</strong>
                    </div>

                    {/* 상세보기 form 
                  이름 아이디 주민번호 주소 전화번호 성별 등록일 구분 */}
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <strong>이름</strong>
                        <InputGroup className="input-group-alternative">
                          <span>{name}</span>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>나이</strong>
                        <InputGroup className="input-group-alternative">
                          <span>{age}</span>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>성별</strong>
                        <InputGroup className="input-group-alternative">
                          {
                            (function () {
                              if (gender === 'M') return (<span>남자</span>);
                              if (gender === 'F') return (<div>여자</div>);
                            })()
                          }

                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>아이디</strong>
                        <InputGroup className="input-group-alternative">
                          <span>{id}</span>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>주민번호</strong>
                        <InputGroup className="input-group-alternative">
                          <span>{ssn}</span>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>주소</strong>
                        <InputGroup className="input-group-alternative">
                          <span>{addr}</span>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>전화번호</strong>
                        <InputGroup className="input-group-alternative">
                          <span>{phone}</span>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>등록일</strong>
                        <InputGroup className="input-group-alternative">
                          <span>  {formatDate}    </span>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>구분</strong>
                        <InputGroup className="input-group-alternative">
                          {
                            (function () {
                              if (role === 1) return (<span>원무과</span>);
                              if (role === 2) return (<div>간호사</div>);
                              if (role === 3) return (<div>수간호사</div>);
                              if (role === 4) return (<div>의사</div>);
                              if (role === 9) return (<div>관리자</div>);
                            })()
                          }
                        </InputGroup>
                      </FormGroup>

                    </Form>
                  </CardBody>
                </Card>
              </div>
              <div className="modal-footer">

                <Button className="btn-white" color="default" type="button"
                  onClick={
                    () => setModalState({ isOpen: false })
                  }
                >
                  취소
                </Button>

              </div>
            </React.Fragment>
          );
          if (checkModalContent.isModify === true) return (
            <React.Fragment>
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    {/* header 문구 */}
                    <div className="text-center text-muted mb-4">

                      <strong>직원 정보 수정</strong>
                    </div>

                    <Form role="form"
                      onSubmit={handlerSubmit}
                    >
                      <FormGroup className="mb-3">
                        <strong>이름</strong>
                        <InputGroup className="input-group-alternative">
                          <Input
                            placeholder={name}
                            type="name"
                            value={updateUser.name}
                            // onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { name: e.target.value }))}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { name: e.target.value }))}

                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <strong>아이디</strong>
                        <InputGroup className="input-group-alternative">

                          <Input
                            placeholder={id}
                            type="name"
                            value={updateUser.id}
                            // onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { id: e.target.value }))}
                            // onChange={(e) => setUpdateUser({ id: e.target.value })}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { id: e.target.value }))}

                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* <FormGroup className="mb-3">
                        <strong>주민번호</strong>

                        <InputGroup className="input-group-alternative">

                          <Input
                            placeholder={ssn}
                            type="name"
                            value={updateUser.ssn}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { ssn: e.target.value }))}
                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup> */}
                      <FormGroup className="mb-3">
                        <strong>주민번호</strong>

                        <Row>

                          <Col className="col-sm">

                            <InputGroup className="input-group-alternative">
                              <InputGroupText>
                              </InputGroupText>
                              <Input
                                placeholder="주민번호"
                                type="text"
                                value={updateUser.split_ssn1}
                                onKeyUp={jumpSsn}
                                id="ssn"
                                onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { split_ssn1: e.target.value }))}

                              />
                            </InputGroup>

                          </Col>

                          <Col className="col-sm">
                            <InputGroup className="input-group-alternative">
                              <InputGroupText>
                              </InputGroupText>
                              <Input
                                placeholder="주민번호"
                                type="password"
                                id="ssn2"
                                value={updateUser.split_ssn2}
                                maxLength="7"
                                onChange={onChangeInputSsn}

                              />
                            </InputGroup>

                          </Col>
                        </Row>

                      </FormGroup>


                      <FormGroup className="mb-3">
                        <Row>
                          <Col className="col-sm">
                            <InputGroup className="input-group-alternative">
                              <InputGroupText>
                              </InputGroupText>
                              <Input
                                placeholder="전화번호"
                                type="text"
                                id="cellPhone1"
                                value={updateUser.split_phone1}

                                // onChange={(e) => setPhone1(e.target.value)}
                                onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { split_phone1: e.target.value }))}

                                onKeyUp={jumpPhone}

                              // autoComplete="new-id"
                              />
                            </InputGroup>

                          </Col>

                          <Col className="col-sm">
                            <InputGroup className="input-group-alternative">
                              <InputGroupText>
                              </InputGroupText>
                              <Input
                                placeholder="전화번호"
                                type="text"
                                id="cellPhone2"
                                value={updateUser.split_phone2}
                                onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { split_phone2: e.target.value }))}
                                // onChange={(e) => setPhone2(e.target.value)}
                                onKeyUp={jumpPhone2}


                              />
                            </InputGroup>

                          </Col>

                          <Col className="col-sm">
                            <InputGroup className="input-group-alternative">
                              <InputGroupText>
                              </InputGroupText>
                              <Input
                                placeholder="전화번호"
                                type="text"
                                id="cellPhone3"
                                value={updateUser.split_phone3}

                                onChange={onChangeInputPhone}

                              />
                            </InputGroup>

                          </Col>
                        </Row>


                      </FormGroup>

                      <FormGroup className="mb-3">

                        <strong>성별</strong>

                        <Row>

                          <Col>

                            <div className="custom-control custom-radio mb-3">
                              <input
                                className="custom-control-input"
                                defaultChecked = {updateUser.gender === "M"}
                                id="customRadio5"
                                name="custom-radio-2"
                                type="radio"
                                value={"M"}
                                // onChange={(e) => setUpdateUser( { gender: e.target.value })}
                                onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { gender: e.target.value }))}
                              // onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { gender: e.target.value }))}

                              />
                              <label className="custom-control-label" htmlFor="customRadio5">
                                남자
                              </label>
                            </div>

                            <div className="custom-control custom-radio mb-3">
                              <input
                                className="custom-control-input"
                                defaultChecked = {updateUser.gender === "F"}
                                id="customRadio6"
                                name="custom-radio-2"
                                type="radio"
                                value={"F"}
                                // onChange={(e) => setUpdateUser({ gender: e.target.value })}
                                onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { gender: e.target.value }))}
                              />
                              <label className="custom-control-label" htmlFor="customRadio6">
                                여자
                              </label>
                            </div>
                          </Col>
                          <Col>
                            <InputGroup className="input-group-alternative">

                              <select className="custom-select d-block w-100" id="root"
                                id="role"
                                name="role"
                                value={updateUser.role}
                                // placeholder={role}
                                // onChange={onChangeInputRole}
                                onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { role: e.target.value }))}
                              >
                                <option value='1'>원무과</option>
                                <option value='2'>간호사</option>
                                <option value='3'>수간호사</option>
                                <option value='4'>의사</option>
                                <option value='9'>관리자</option>
                              </select>
                              {/* // autoComplete="new-id" */}
                            </InputGroup>
                          </Col>
                        </Row>

                      </FormGroup>

                      <FormGroup className="mb-3">
                        <Row>
                          <Col className="col-sm">
                            <InputGroup className="input-group-alternative">
                              <InputGroupText>
                              </InputGroupText>
                              <Input
                                placeholder=""
                                type="text"
                                value={updateUser.split_zonecode}
                              />
                            </InputGroup>
                          </Col>
                          <Col>
                            <Button
                              color="default"
                              type="button"
                              onClick={() => setPostModal({ isOpen: true })}>
                              우편번호
                            </Button>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 주소 입력창 icon */}
                            <InputGroupText>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="주소"
                            type="text"
                            value={updateUser.split_addr}
                            // onChange={onChangeInputAddr}
                            onClick={() => setPostModal({ isOpen: true })}


                          // onChange={(e) => setUser(Object.assign({}, user, { addr: e.target.value }))}
                          // autoComplete="new-id"
                          />

                        </InputGroup>

                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 주소 입력창 icon */}
                            <InputGroupText>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="상세주소"
                            type="text"
                            value={updateUser.split_daddr}
                            onChange={onChangeInputAddr}

                          />

                        </InputGroup>

                      </FormGroup>


                    </Form>
            



                  </CardBody>
                </Card>
              </div>
              <div className="modal-footer">
                <Button
                  className="btn-white"
                  color="default"
                  type="submit"
                  onClick={onClickModify}
                >
                  수정
                </Button>
                <Button className="btn-white" color="default" type="button"
                  onClick={closeModal
                  }
                >
                  취소
                </Button>

              </div>


              <Modal
                className="modal-dialog-centered"
                size="m"
                isOpen={postModal.isOpen}
                style={addrApiModal}
                toggle={() => setPostModal({ isOpen: false })}
              >

                <div className="addr-api-modal-header">
                  <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />


                  <h5 className="modal-title" id="exampleModalLabel">
                    <br /><br />
                  </h5>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setPostModal({ isOpen: false })}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <br />
                </div>


              </Modal>
            </React.Fragment>
          );

        })()
      }

    </Modal>

  );

}

