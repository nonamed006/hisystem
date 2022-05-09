/*eslint-disable*/
import { useState } from "react";
import { Redirect, useHistory } from "react-router";
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
  Row,
  Col,
} from "reactstrap";

const Login = (props) => {

  const history = useHistory();

  const [user, setUser] = useState({
    id: "",
    password: ""
  });

  var userName = props.userName;
  var setUserName = props.setUserName;

  const inputHandle = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const joinRequest = (e) => {
    e.preventDefault();
    let person = {
      id: user.id,
      pwd: user.password,
    }


    fetch("http://localhost:8081/login", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      }
    }).then(res => {
      for (let header of res.headers.entries()) {
        if (header[0] === "authorization") {
          let data = header[1];
          //data = data.substring(7);
          localStorage.setItem("Authorization", data);
          //setToken();
        }
      }
      return res.text();
    }).then(
      res => {
        if(res.substring(0, 7) != 'success') alert(res);
        else{
          // 로그인 성공하면 이동
          history.push('/admin/main');
          
          var name = res.substring(8)
          alert(name);
        }
      });

  }
 

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <br /><br /><br />
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    {/* id 입력창 icon */}
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="id"
                    placeholder="Id"
                    type="id"
                    onChange={inputHandle}
                    value={user.id}
                  // autoComplete="new-id"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={inputHandle}
                    value={user.password}
                  // 비밀번호 자동완성 관련인듯 / 넣으면 추천 비밀번호
                  // autoComplete="new-password"
                  />
                </InputGroup> 
              </FormGroup>

              {/* id, pw 이후 */}
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <br />
              <div className="text-center">
                <Button onClick={joinRequest} className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

        {/* LoginBox 하단 */}
        <Row className="mt-3">
          <Col xs="6"></Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>문의하기</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
