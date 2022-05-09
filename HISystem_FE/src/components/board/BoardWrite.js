import React, { Fragment, useEffect, useState } from 'react';


import {
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Col
  } from "reactstrap";
import styled from 'styled-components';

const DivStyle = styled.div`
  border-top: 1px solid #e9ecef;
  margin: 43px 0px 0px 0px;
  padding: 20px 30px 10px 30px;
`;
const InputTitle = styled.input`
  /border: none;
  /width: 100px;
`;

const InputContents = styled.input`
  /border: none;
  /width: 100px;
`;
const inputContainer = styled.div`
  border-bottom: 2px solid #3b5bdb;
`;


const BoardWrite = ({header_title,reload,setReload,changeWrite,setChangeWrite,changeModify,setChangeModify, board,setBoard}) => {

  // 수정하기에서 글 쓰기 버튼 눌렀을 때 초기화
  useEffect(() => {
    changeWrite === true 
    ?
      setNewBoard(Object.assign({}, newBoard, { 
        no: "",
        title: "",
        contents : "",
        user_name: "",
        hit: "",
        reg_date : "",
        user_no : ""
      }))
      
    :
      setNewBoard(Object.assign({}, newBoard, { title: board.title, contents : board.contents }))

  }, [changeWrite]);

    const [newBoard, setNewBoard] = useState({
        no: board.no,
        title: board.title,
        contents: board.contents,
        user_name: board.user_name,
        hit: board.hit,
        reg_date : board.reg_date,
        user_no : board.user_no
      });
    
    // const [updateBoard, setUpdateBoard] = useState({
    //     title: title,
    //     contents: contents,
    //     user_name: user_name,
    //     hit: hit,
    //     reg_date : reg_date,
    //     user_no : user_no
    //   });

      const onClickRegister = (e) => {
        e.preventDefault();
        
        // setNewBoard("")
        if(header_title === '글 쓰기'){
          alert("등록되었습니다")
        }else{
          alert("수정되었습니다")          
        }
        
        setChangeModify(false)
        setChangeWrite(false)
        writeBoard(e);
      }

    const writeBoard = async(e) => {
        e.preventDefault();
        console.log(newBoard)
        debugger;
        console.log("1234")

        const response = await fetch(`http://localhost:8081/user/board/${header_title == '글 쓰기' ? 'add' : 'update' }`, {
          method: "post",
          headers: {
            'Content-Type': "application/json; charset=utf-8",
            'Authorization': localStorage.getItem("Authorization")
          },
          body: JSON.stringify(newBoard)
        }).then((res)=> res.json())
        .then((res) => {
          setBoard(res);

        });
        // if (!response.ok) {
        //   console.log(response)
        //   throw `${response.status} ${response.statusText}`;
        // }
        console.log(response)
        setReload(!reload);

        // const jsonResult = response.json;
    
    }
    // useEffect(() => {
    // }, [board]);
        const onChangeTitle = (e) =>{
        setNewBoard(Object.assign({}, newBoard, { title: e.target.value }))
      }
      const onChangeContents = (e) =>{



        setNewBoard(Object.assign({}, newBoard, { contents: e.target.value }))
      }
    return (
<Fragment>
        <CardHeader className="border-0">
        <Row>
          <Col md='11'>
          <Button color="primary" size = 'sm' type="button">
            {header_title}
        </Button>            
          </Col>
        </Row>

      </CardHeader>
        
        <Form
        role= "form"
        // onSubmit={writeBoard}
        >
          <DivStyle>
        <FormGroup>

        <h4>제목</h4>

          <Input placeholder="제목을 입력하세요"
            type="text"
            style={{ width: "300px" }}
            value = {newBoard.title}
            onChange={onChangeTitle}

          />
        </FormGroup>
        <FormGroup>
        <h4>내용</h4>
          <Input
            id="exampleFormControlTextarea1"
            placeholder="내용을 입력하세요"
            rows="2"
            type="textarea"
            style={{ height: "280px" }}
            value = {newBoard.contents}
            onChange={onChangeContents}
          />
           </FormGroup>
           </DivStyle>
      
    <CardFooter className="py-0">
      <nav aria-label="...">
          <Button
            className="my-4"
            color="primary"
            // type="submit"
            style={{ float: 'right' }}
            
          onClick ={onClickRegister}  
          // onClick={closeModal}
          // onClick={() => {setModalState(Object.assign({}, modalState, {isOpen: false})) } }
          // onClick={() => { () => setModalState({isOpen: false}) }}
          > {header_title === "글 쓰기"
              ? "등록"
              : "수정" }
          </Button>
      </nav>
    </CardFooter>
    </Form>
    
    </Fragment>
    );
};

export default BoardWrite;