/*eslint-disable*/
import UserAddModal from 'components/modal/UserAddModal';
// import UserAddModal2 from 'components/modal/UserAddModal2';
// import UserAddModal3 from 'components/modal/UserAddModal3';
import Test from 'components/modal/Test';
import DeleteWarning from 'components/modal/public/DeleteWarning';
import UserTableBody from './UserTableBody';
// import UserTableBody2 from './UserTableBody2';
import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
// import "@lourenci/react-kanban/dist/styles.css";
import "assets/css/boardstyle.css";

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
import { updateAsExpression } from 'typescript';
import InputBox from 'components/input/InputBox';
// core components

const UserTable = () => {

  const board = {
    columns: [
      {
        id: 1,
        title: "할 일",
        cards: [
          {
            id: 1,
            title: "화장실청소",
            description: "물떼제거 : 락스로해야함."
          },
          {
            id: 2,
            title: "바이탈사인 체크하기",
            description: "병상 환자 전부다 해야함"
          }
        ]
      },
      {
        id: 2,
        title: "하는중",
        cards: [
          {
            id: 3,
            title: "약 가져와야함",
            description: "약가져오기 안 가져오면 선생님한테 혼남"
          }
        ]
      },
      {
        id: 3,
        title: "다함",
        cards: [
          {
            id: 4,
            title: "오늘 취사 지원가기",
            description: "사유 : 조리병 휴가"
          }
        ]
      }
    ]
  };


  function onCardMove(card, source, destination) {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);

    console.log("----------");
    console.log(card);
    console.log(source);
    console.log(destination);
    console.log(updatedBoard);
  }
  const tableTitle = ['No', '이름', '나이', '성별', 'id', '직무'] // 빈 건 우측 드롭다운

  // 특별한 class / setUsers: setter 
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState([]); // page button 
  const [nowPage, setNowPage] = useState(1); // 현재 page
  const [search, setSearch] = useState('');     // 검색어 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [reload, setReload] = useState(false); // 추가로 인한 리로드 체크

  // 
  useEffect(() => {
    getAcceptanceList(nowPage, search);
  }, [reload]);
  var getAcceptanceList = (page,kwd) =>{
    fetch(`http://localhost:8081/admin/user/${page}/${kwd == '' ? 'notSearch' : kwd}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        

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
  };
  // var getUserList = (page, kwd) => {
  //   console.log(page, kwd)
  //   // ajax
  //   fetch(`http://localhost:8081/admin/user/${page}/${kwd == '' ? 'notSearch' : kwd}`, {
  //     method: "get",
  //     // res에 결과가 들어옴
  //   }).then((res) => res.json())
  //     .then((res) => {
  //       setUsers(res);
  //       // let postNum = user.addr.substring(0,)

  //       let sp = res.beginPage;
  //       let ep = res.endPage;
  //       let tmp = [];
  //       let index = 0;
  //       for (var i = sp; i <= ep; i++) {
  //         tmp[index++] = i;
  //       }

  //       setPage(tmp);
  //       setPageInfo([res.totalCount, res.isPrevPage, res.isNextPage]);

  //     });
  //   console.log('aaaaa');
  // };

  // 검색창
  const inputSearch = (e) => {
    setSearch(e.target.value);
  };

  function enterkey(e) {
    e.preventDefault();
    if (window.event.keyCode == 13) {
      setNowPage(1);
      getUserList(1, search);
      // setSearch('');
    }
  }
function onCardDragEnd(e){
  console.log(e)
}

  // 신규등록 버튼
  const btvEventInsertUser = (e) => {
    e.preventDefault();
    alert('신규등록모달띄우기');
  };

  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>

          <div className="col">

            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col md='11'>
                    <Button color="primary" type="button" size='sm'>
                    test
                    </Button>
                  </Col>
                  {/* secondary / info / size="lg" */}
                </Row>
                {/* 우측 상단 검색 / class 제외 navbar-search-dark */}

                <InputBox placeholder="Search" type="text"
                  value={search}

                />

              </CardHeader>

            


            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserTable;