/*eslint-disable*/
// import BoardAddModal from 'components/modal/BoardAddModal';

import React, { useEffect, useState } from 'react';
import LeftBoardTable from './LeftBoardTable';
import {
  Container,
  Row
} from "reactstrap";
import RightBoardTable from './RightBoardTable';
// core components

const BoardTable2 = () => {

  // 특별한 class / setBoard: setter 
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState([]); // page button 
  const [nowPage, setNowPage] = useState(1); // 현재 page
  const [search, setSearch] = useState('');     // 검색어 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [reload, setReload] = useState(false); // 추가로 인한 리로드 체크
  const [user, setUser] = useState({}); // 권한 확인위한  상태값

  const [board, setBoard] = useState({
    no: "",
    row_no: "",
    title: "",
    contents: "",
    user_name: "",
    hit: "",
    reg_date: "",
    user_no: ""

  });

  const [changeWrite, setChangeWrite] = useState(false)
  const [changeModify, setChangeModify] = useState(false)
  // 
  useEffect(() => {
    getBoardList(nowPage, search);
  }, [reload]);


  var getBoardList = (page, kwd) => {

    // BoardList 가져오기
    fetch(`http://localhost:8081/admin/board/${page}/${kwd == '' ? 'notSearch' : kwd}`, {
      method: "get",
      headers: { 'Authorization': localStorage.getItem("Authorization") }
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setBoards(res);
        // console.log(res)
        let sp = res.beginPage;
        let ep = res.endPage;
        let tmp = [];
        let index = 0;
        for (var i = sp; i <= ep; i++) {
          tmp[index++] = i;
        }

        setPage(tmp);
        setPageInfo([res.totalCount, res.isPrevPage, res.isNextPage]);

      });
    // 로그인한 계정 정보 가져오기
    fetch(`http://localhost:8081/user/board`, {
      method: "get",
      headers: { 'Authorization': localStorage.getItem("Authorization") }
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        // userList = res
        setUser(res);
        console.log(res)

      });
    console.log('패치끝');
  };


  //조회수 증가
  const updateHit = async (board) => {
    console.log("1234")
    const response = await fetch(`http://localhost:8081/admin/board/hit`, {
      method: "post",
      headers: {
        'Content-Type': "application/json; charset=utf-8",
      },
      body: JSON.stringify(board)
    });
    if (!response.ok) {
      console.log(response)
      throw `${response.status} ${response.statusText}`;
    }
    console.log(response)
    // const jsonResult = response.json;
    setChangeWrite(false);
    setChangeModify(false);
    setReload(!reload);

  }


  // 검색창
  const inputSearch = (e) => {

    setSearch(e.target.value);
  };

  function enterkey(e) {
    e.preventDefault();
    if (window.event.keyCode == 13) {
      setNowPage(1);
      getBoardList(1, search);
      // setSearch('');
    }
  }


  const onClickTr = (board) => {
    setBoard(board);

    console.log(board)
    updateHit(board);
    setChangeModify(false);
    setChangeWrite(false);

  }

  function onClickWrite(e) {
    e.preventDefault();
    setChangeWrite(true)
    setChangeModify(false);
  }

  function onClickModifyBtn() {
    // setCheckModifyWrite(Object.assign({}, checkModifyWrite, { isModify: true }))
    setChangeModify(true);
    setChangeWrite(false);
  }

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <LeftBoardTable
            search = {search}
            setSearch={setSearch}
            inputSearch = {inputSearch}
            onClickWrite = {onClickWrite}
            user = {user}
            enterkey = {enterkey}
            boards={boards}
            onClickTr={onClickTr}
            reload={reload}
            setReload={setReload}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            nowPage={nowPage}
            getBoardList={getBoardList}
            page={page}
            setPage={setPage}
            setNowPage={setNowPage}
          />
         
          {/* 오른쪽테이블 */}
          <RightBoardTable 
           board = {board}
           reload={reload}
           setReload={setReload}
           changeWrite={changeWrite}
           setChangeWrite={setChangeWrite}
           setChangeModify={setChangeModify}
           changeModify={changeModify}
           user = {user}
           onClickModifyBtn={onClickModifyBtn}
          />
        </Row>
      </Container>
    </>
  );
};

export default BoardTable2;
