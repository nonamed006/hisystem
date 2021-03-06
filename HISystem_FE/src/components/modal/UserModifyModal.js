/*eslint-disable*/

import React, { useState, useRef } from "react";
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

const UserModifyModal = ({ name, id, gender, role, phone, ssn, addr, reg_date, age,modalState,setModalState }) => {


  
  const [user, setUser] = useState({
    name: "",
    id: "",
    pwd: "",
    ssn: "",
    addr: "",
    phone: "",
    gender: "F",
    role: 1,
  });


  // function openModal() {
  //   setModalState(true);
  // }

  // const [isOpen, setIsOpen] = useState(false);


  // const onInputUser = (e) => {
  //   setUser({}, Object.assign(user), {
  //     name: name,
  //     id: id,
  //     pwd: pwd,
  //     ssn : ssn,
  //     addr : addr,
  //     phone : phone,
  //     gender : gender,
  //     role : role

  //   });
  //   console.log(user)
  // }

  // const onClickInputUser = () => {
  //   setUser(Object.assign({}, user, {name: name}))
  //   setUser(Object.assign({}, user, {id: id}))
  //   setUser(Object.assign({}, user, {pwd: pwd}))
  //   setUser(Object.assign({}, user, {ssn: ssn}))
  //   setUser(Object.assign({}, user, {addr: addr}))
  //   setUser(Object.assign({}, user, {phone: phone}))
  //   setUser(Object.assign({}, user, {gender: gender}))
  //   setUser(Object.assign({}, user, {role: role}))
  //   console.log(user)
  // };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    const response = await fetch(`http://localhost:8081/admin/user/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      console.log(response)
      throw `${response.status} ${response.statusText}`;
    }
    console.log(response)
    // const jsonResult = response.json;
  };

  function closeModal() {
    setModalState({ isOpen: false })
    setTimeout(() => {
      setUser("")
    }, 200);

  }

  return (
    <>
      <Row>
        <Col md="12">
          <Button color="primary" type="button"
            onClick={() => setModalState({ isOpen: true })}
          >
            ????????????
          </Button>

          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={modalState.isOpen}
            toggle={closeModal}
          // toggle={ () => setModalState({isOpen: false}) }
          >
            <div className="modal-header">
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={closeModal}
                >
                <span aria-hidden={true}>??</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  {/* header ?????? */}
                  <div className="text-center text-muted mb-4">
                    <strong>?????? ????????????</strong>
                  </div>
                  {/* ?????? form 
                        ?????? ????????? ???????????? ???????????? ?????? ???????????? ?????? ?????? */}
                  <Form
                    role="form"
                    // ref={refForm}
                    onSubmit={handlerSubmit}
                  >
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          {/* ?????? ????????? icon */}
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="??????"
                          type="name"
                          value={user.name}
                          onChange={(e) => setUser(Object.assign({}, user, { name: e.target.value }))}
                        // onChange={onChangeInputName}
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          {/* ????????? ????????? icon */}
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="?????????"
                          type="id"
                          value={user.id}
                          // onChange={onChangeInputId}
                          onChange={(e) => setUser(Object.assign({}, user, { id: e.target.value }))}
                        // autoComplete="new-id"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          {/* ???????????? ????????? icon */}
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="????????????"
                          type="password"
                          value={user.pwd}
                          // onChange={onChangeInputPwd}
                          onChange={(e) => setUser(Object.assign({}, user, { pwd: e.target.value }))}
                        // autoComplete="new-id"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          {/* ???????????? ????????? icon */}
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="????????????"
                          type="text"
                          value={user.ssn}
                          // onChange={onChangeInputSsn}
                          onChange={(e) => setUser(Object.assign({}, user, { ssn: e.target.value }))}
                        // autoComplete="new-id"
                        />
                      </InputGroup>
                    </FormGroup>
                    {/* 
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">

                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="??????"
                          type="text"
                          value={user.addr}
                          onChange={(e) => setUser(Object.assign({}, user, { addr: e.target.value }))}
                        />
                      </InputGroup>
                    </FormGroup> */}

                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          {/* ?????? ????????? icon */}
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="??????"
                          type="text"
                          value={user.addr}
                          // onChange={onChangeInputAddr}
                          onChange={(e) => setUser(Object.assign({}, user, { addr: e.target.value }))}
                        // autoComplete="new-id"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          {/* ???????????? ????????? icon */}
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="????????????"
                          type="tel"
                          // pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                          value={user.phone}
                          // onChange={onChangeInputPhone}
                          onChange={(e) => setUser(Object.assign({}, user, { phone: e.target.value }))}

                        // autoComplete="new-id"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <Row>

                          <input
                            id="genderF"
                            name="gender"
                            type="radio"
                            value={"F"}
                            // onChange={onChangeInputdGender}
                            onChange={(e) => setUser(Object.assign({}, user, { gender: e.target.value }))}
                          />
                          F
                          <input
                            id="genderM"
                            name="gender"
                            type="radio"
                            value={"M"}
                            // onChange={onChangeInputdGender}
                            onChange={(e) => setUser(Object.assign({}, user, { gender: e.target.value }))}

                          />
                          M
                        </Row>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">

                        <select className="custom-select d-block w-100" id="root"

                          id="role"
                          name="role"
                          value={user.role}
                          // onChange={onChangeInputRole}
                          onChange={(e) => setUser(Object.assign({}, user, { role: e.target.value }))}
                        >
                          <option value='1'>?????????</option>
                          <option value='2'>?????????</option>
                          <option value='3'>????????????</option>
                          <option value='4'>??????</option>
                          <option value='9'>?????????</option>
                        </select>
                        {/* // autoComplete="new-id" */}
                      </InputGroup>
                    </FormGroup>

                    {/* ???????????? ?????? */}
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="submit"
                        closeModal
                        onClick={closeModal}
                      // onClick={() => {setModalState(Object.assign({}, modalState, {isOpen: false})) } }
                      // onClick={() => { () => setModalState({isOpen: false}) }}
                      > ????????????

                      </Button>
                    </div>
                  </Form>


                </CardBody>
              </Card>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );

}
export default UserModifyModal;