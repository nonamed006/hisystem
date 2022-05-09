/*eslint-disable*/
import React, { useState } from "react";
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
} from "reactstrap";

export default function ({ no, name, id, gender, role, phone, ssn, addr, reg_date, age, modalState, setModalState }) {

  var modalTab = ['상세보기', '정보수정'];
  const [checkModalContent, setCheckModalContent] = useState(modalTab[0]);

  const [updateUser, setUpdateUser] = useState({
    name: name,
    id: id,
    ssn: ssn,
    addr: addr,
    phone: phone,
    gender: gender,
    role: role,
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  function closeModal() {
    setModalState({ isOpen: false })
    setTimeout(() => {
    }, 200);
  }

  return (
    <Modal
      className="modal-dialog-centered"
      size="sm"
      isOpen={modalState.isOpen}
      toggle={() => setModalState({ isOpen: false })}
    >
      <div class="btn-group btn-group-toggle" data-toggle="buttons" >

{modalTab.map((res)=>{
  return <>
      <label class="btn btn-light">
      <input type="radio" 
        onChange={()=>setCheckModalContent(res)}
      />{res}
    </label>
    </>
})}
  
        

      </div>


      {
        (function () {
          if (checkModalContent == modalTab[0]) return (
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
                          <span>{gender}</span>
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
                          <span>{reg_date}</span>
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
          if (checkModalContent == modalTab[1]) return (
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
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={name}
                            type="name"
                            value={updateUser.name}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { name: e.target.value }))}
                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={id}
                            type="name"
                            value={updateUser.id}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { id: e.target.value }))}
                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={ssn}
                            type="name"
                            value={updateUser.ssn}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { ssn: e.target.value }))}
                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          {
                            (function () {
                              if (updateUser.gender === 'F') return (
                                <Row>

                                  <input
                                    id="genderF"
                                    name="gender"
                                    type="radio"
                                    value={"F"}
                                    checked
                                    // onChange={onChangeInputdGender}
                                    onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { gender: e.target.value }))}
                                  />
                                  F
                                  <input
                                    id="genderM"
                                    name="gender"
                                    type="radio"
                                    value={"M"}
                                    // onChange={onChangeInputdGender}
                                    onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { gender: e.target.value }))}

                                  />
                                  M
                                </Row>
                              );
                              if (updateUser.gender === 'M') return (
                                <Row>

                                  <input
                                    id="genderF"
                                    name="gender"
                                    type="radio"
                                    value={"F"}
                                    // onChange={onChangeInputdGender}
                                    onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { gender: e.target.value }))}
                                  />
                                  F
                                  <input
                                    id="genderM"
                                    name="gender"
                                    type="radio"
                                    value={"M"}
                                    checked
                                    // onChange={onChangeInputdGender}
                                    onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { gender: e.target.value }))}

                                  />
                                  M
                                </Row>
                              );

                            })()
                          }
                        </InputGroup>
                      </FormGroup>




                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={addr}
                            type="name"
                            value={updateUser.addr}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { addr: e.target.value }))}
                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={phone}
                            type="name"
                            value={updateUser.phone}
                            onChange={(e) => setUpdateUser(Object.assign({}, updateUser, { phone: e.target.value }))}
                          // onChange={onChangeInputName}
                          />
                        </InputGroup>
                      </FormGroup>




                      <FormGroup className="mb-3">
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
                      </FormGroup>


                    </Form>
                  </CardBody>
                </Card>
              </div>
              <div className="modal-footer">
                <Button
                  className="btn-white"
                  color="default"
                  type="button"
                  onClick={closeModal}
                >
                  수정
                </Button>
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

        })()
      }

    </Modal>

  );

}

