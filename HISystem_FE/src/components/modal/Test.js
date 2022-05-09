import React from "react";
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

class Test extends React.Component {

  state = {
    defaultModal: "formModal"
  };

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    const {no,row_no,name,id,gender,role,phone,ssn,addr,reg_date,age} = this.props
    return (
      <>
        <Row>
          <Col md="12">
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal("formModal")}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    {/* header 문구 */}
                    <div className="text-center text-muted mb-4">
                      <small>직원 신규등록</small>
                    </div>


                    {/* 등록 form 
                        이름 아이디 비밀번호 주민번호 주소 전화번호 성별 구분 */}
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 이름 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="이름"
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 아이디 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="아이디"
                            type="id"
                          // autoComplete="new-id"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 비밀번호 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="비밀번호"
                            type="id"
                          // autoComplete="new-id"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 주민번호 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="주민번호"
                            type="id"
                          // autoComplete="new-id"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 주소 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="주소"
                            type="id"
                          // autoComplete="new-id"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 전화번호 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="전화번호"
                            type="id"
                          // autoComplete="new-id"
                          />
                        </InputGroup>
                      </FormGroup>
                      
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 성별 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="성별"
                            type="id"
                          // autoComplete="new-id"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            {/* 구분 입력창 icon */}
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="구분"
                            type="id"
                          // autoComplete="new-id"
                          />
                        </InputGroup>
                      </FormGroup>


                      


                      {/* 등록하기 버튼 */}
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                        >
                          등록하기
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
}

export default Test;