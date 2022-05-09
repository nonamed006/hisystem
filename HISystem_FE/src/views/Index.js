/*eslint-disable*/
import { useState } from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import KandanBoard from "components/main/KandanBoard";
import TodoListCard from "components/todoList/TodoListCard";
import { useEffect } from "react/cjs/react.development";

const Index = (props) => {
  const [user, setUser] = useState({});
	const [test, setTest] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/user", {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("Authorization")
      }
    }).then((res) => res.json())
      .then((res) => {
        setUser(res);
      });
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        
        <Row>
          <Col xl = '8'>
            {user.no == undefined ? null : <KandanBoard test = {test} setTest = {setTest} userNo = {user.no}></KandanBoard>}
          </Col>
          <Col xl = '4'>
            <TodoListCard></TodoListCard>
          </Col>
          {/* <Graph/> */}
        </Row>
      </Container>
    </>
  );
};

export default Index;
