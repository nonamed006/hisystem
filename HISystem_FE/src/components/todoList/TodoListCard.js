import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { useState } from 'react/cjs/react.development';
import ReactDatetime from "react-datetime";

const DivBack = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffa8a8;
  padding-top:2px;
  border-radius:100px;
  position: relative;
`;

const DivBack2 = styled.div`
  width: 100px;
  height: 10px;
  position: absolute;
  margin: 5px;
`;

const h = window.innerHeight * 0.7;

const DivStyle1 = styled.div`
  width : 100%;
  height : 550px;
  //border: 1px solid black;
  /padding : 20px 40px 20px 40px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 5px 5px 3px #ced4da;
`;

const DivStyle2 = styled.div`
  width: 400px;
  height: 300px;
  /border-top: 1px solid black;
  margin: 30px 5px 5px 50px;
  overflow: auto;
`;

const DivStyle3 = styled.div`
  width: 370px;
  /padding: 5px;
  margin: 25px;
  border-bottom: 1px solid lightgrey;

`;

const DivStyle4 = styled.div`
  border-top: 1px solid lightgrey;
  padding-top: 40px;
`;

const DivHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding : 30px 40px 0px 40px;
`;

const Input = styled.input`
  width : 270px;
  /padding: 5px;
  border: none;
`;

const InputBox = styled.div`
  width: 270px;
  border-bottom: 1px solid #f5365c;
`;

const DivPointer = styled.div`
  cursor: pointer;
`;

const DivButton_off = styled.div`
  width: 18px;
  height: 18px;
  border : 2px solid #f03e3e;
  border-radius: 5px;
  cursor: pointer;
`;

const DivButton_on = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #f03e3e;
  background-color: #fa5252;
  border-radius: 5px;
  cursor: pointer;
`;

const TodoListCard = () => {

  const [todolist, setTodolist] = useState([]);
  const [contents, setContents] = useState("");
  const [reload, setReload] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    //ajax
    fetch(`http://localhost:8081/user/todolist`, {
      method: "get",
      headers: { 'Authorization': localStorage.getItem("Authorization") }
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTodolist(res);
      });
  }, [reload]);

  // 입력창 값 받기
  const inputContents = (e) => {
    setContents(e.target.value);
  };

  // 달력에서 받은 날짜 형변환
  var getDate = (date) => date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

  // db에서 받은 날짜 시간만 자르고싶은데
  var changeDate = (cDate) => cDate.split(" ")[1];

  const handleDate = Idate => {
    setDate(Idate);
    setReload(!reload);
  };

  var insertTodo = () => {
    
    let doList = {
      contents: contents,
      rev_date: getDate(new Date(date))
    };

    fetch(`http://localhost:8081/user/todolist`, {
      method: "post",
      headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': localStorage.getItem("Authorization")
      },
      body: JSON.stringify(doList)
    }).then((res) => res.text())
      .then((res) => {
        if (res == 'success') {
          // res에 따라 성공하면 리스트 리셋
          alert("등록되었습니다");
          setContents("");
          setReload(!reload);
        } else {
          alert("간절하게 클릭하세요");
        }
      }
      );
  }

  // 리스트 삭제
  var deleteTodo = (no) =>{
    fetch(`http://localhost:8081/todolist/${no}`, {
      method: "delete",
    }).then((res) => res.text())
      .then((res) => {
        if (res == 'success') {
          // res에 따라 성공하면 리스트 리셋
          alert("삭제되었습니다.");
          setReload(!reload);
        } else {
          alert("실패");
        }
      }
      );
  }

  // 리스트 상태 변경
  var updateTodo = (no) => {
    fetch(`http://localhost:8081/todolist/${no}`, {
      method: "put",
      // res에 결과가 들어옴
    }).then((res) => res.text())
      .then((res) => {
        if (res == 'success') {
          setReload(!reload);
        } 
      }
      );
  }



  return (
    <DivStyle1>
      {/* 헤더, input창 */}
      <DivHeader>
      <Row>
        <Col xl='3'>
          <DivBack>
            <DivBack2>
              <h3>To-Do List</h3>
            </DivBack2>
          </DivBack>
        </Col>
        <Col xl='2'>
          {/* <Row>
        <InputTimeBox>
          <InputTime1></InputTime1>  
          </InputTimeBox>:
          <InputTimeBox>
          <InputTime1></InputTime1>
        </InputTimeBox>
        </Row> */}
        </Col>
        <Col xl='7'>
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
                placeholder: "날짜/시간을 선택하세요"
              }}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
            // timeFormat={false}
            />
          </InputGroup>
        </FormGroup>
        </Col>
        
        {/* <Col xl='5'>
          <InputBox>
            <Input 
              type="name"
              value={contents}
              id="name"
              onChange= {inputContents}
            ></Input>
          </InputBox>
        </Col>
        <Col xl='2'>
          <Button color="danger" size='sm' outline type="button" onClick={()=> insertTodo()}>
            등록
          </Button>
        </Col> */}
      </Row>
      </DivHeader>
      {/* body */}
      <DivStyle2>
        {/* 리스트 들어가는 부분 */}
        {todolist.map(function (res) {
          return <>
            <DivStyle3>
              <Row>
                <Col xl='2'>
                  <h5>{changeDate(res.rev_date)}</h5>
                </Col>
                <Col xl='1'>{ res.fin_yn == 'N' ? <DivButton_off onClick={() => updateTodo(res.no)}></DivButton_off> :
                  <DivButton_on onClick={() => updateTodo(res.no)}></DivButton_on>
                }
                </Col>
                <Col xl='7'><h5>{res.fin_yn == 'N' ? res.contents : <strike>{res.contents}</strike>}</h5></Col>
                <Col xl='1' onClick={()=>deleteTodo(res.no)}><DivPointer>✖</DivPointer></Col>
              </Row>
            </DivStyle3>
          </>
        })}
      </DivStyle2>
        {/* 하단 입력창, 등록버튼 */}
        <DivStyle4>
        <Row>
          <Col xl = '2'></Col>
        <Col xl='7'>
          <InputBox>
            <Input 
              type="name"
              value={contents}
              id="name"
              onChange= {inputContents}
            ></Input>
          </InputBox>
        </Col>
        <Col xl='2'>
          <Button color="danger" size='sm' type="button" onClick={()=> insertTodo()}>
            등록
          </Button>
        </Col>
        </Row>
        </DivStyle4>
    </DivStyle1>
  );
};

export default TodoListCard;