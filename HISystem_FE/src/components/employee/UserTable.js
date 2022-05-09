/*eslint-disable*/
// import UserAddModal from 'components/modal/UserAddModal';
// import UserAddModal2 from 'components/modal/UserAddModal2';
import UserAddModal3 from 'components/modal/UserAddModal3';
import Test from 'components/modal/Test';
import DeleteWarning from 'components/modal/public/DeleteWarning';
import UserTableBody from './UserTableBody';
// import UserTableBody2 from './UserTableBody2';
import React, { useEffect, useState } from 'react';

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
import styled from 'styled-components';
const h = window.innerHeight * 0.7;
const DivStyle = styled.div`
  height: ${h}px;
`;


// 페이징용 높낮이
const pw = window.innerWidth * 0.65;
const ph = window.innerHeight * 0.62;
const DivStyleFooterPaging = styled.div`
position : absolute;
top: ${ph}px;
left: ${pw}px;
`;
// core components

const UserTable = () => {

  const tableTitle = ['No', '이름', '나이', '성별', 'id', '직무'] // 빈 건 우측 드롭다운

  // 특별한 class / setUsers: setter 
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState([]); // page button 
  const [nowPage, setNowPage] = useState(1); // 현재 page
  const [search, setSearch] = useState('');     // 검색어 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [reload, setReload] = useState(true); // 추가로 인한 리로드 체크
  const [renewalUser,setRenewalUser] = useState([]);
  // 
  useEffect(() => {
    if(reload === true){
      console.log("zzzzz")
    getUserList(nowPage, search);
    setReload(false);
    }
  }, [reload]);
  // useEffect(() => {
  //   if(renewalUser){  //상태값에  값이 들어갔을 때 실행
  //     console.log("aaaaaaaaaaaaaaaaaa")
  //     getUserList(nowPage, search);
  //   }
  // }, [renewalUser]);

  var getUserList = (page,kwd) => {
    console.log(page,kwd)
    // ajax
    fetch(`http://localhost:8081/admin/user/${page}/${kwd == '' ? 'notSearch' : kwd}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        console.log("---------------------------------"+res)
        setUsers(res);
        // let postNum = user.addr.substring(0,)
        
        let sp = res.beginPage;
        let ep = res.endPage;
        let tmp = [];
        let index = 0;
        for(var i = sp; i <= ep; i++){
          tmp[index++] = i;
        }
        
        setPage(tmp);
        setPageInfo([res.totalCount, res.isPrevPage, res.isNextPage]);
        // setRenewalUser([])

      });
    console.log('aaaaa') ;
  };

  // 검색창
  const inputSearch = (e) => {
    setSearch(e.target.value);
  };

  function enterkey(e) {
    e.preventDefault();
    if (window.event.keyCode == 13) 
    {
      setNowPage(1);
      getUserList(1, search);
      // setSearch('');
    }
  }

  // const userAdd = async(user) => {
  //   console.log('callback')
  //   console.log(user);
  //   const response = await fetch(`http://localhost:8081/admin/user/add`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   });

  //   if (!response.ok) {
  //     console.log(response)
  //     throw `${response.status} ${response.statusText}`;
  //   }
  //   console.log(response)
  // }
  
  // 신규등록 버튼
  const btvEventInsertUser = (e) => {
    e.preventDefault();
    alert('신규등록모달띄우기');
  };
  
  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));
  console.log("----------------"+users)
  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>

          <div className="col">

            <Card className="shadow">
              <DivStyle>
              <CardHeader className="border-0">
                <Row>
                <Col md='11'>
                  <Button color="primary" type="button" size='sm'>
                        직원 조회
                      </Button> 
                  </Col>
                  {/* secondary / info / size="lg" */}
                  
                  {/* <UserAddModal  reload={reload} setReload={setReload}></UserAddModal> */}
                  {/* <UserAddModal2  reload={reload} setReload={setReload}></UserAddModal2> */}
                  <UserAddModal3 renewalUser={renewalUser} setRenewalUser={setRenewalUser} reload={reload} setReload={setReload}></UserAddModal3>
                </Row>
                {/* 우측 상단 검색 / class 제외 navbar-search-dark */}
              
                <InputBox placeholder="Search" type="text"
                value={search}
                onChange={inputSearch}
                onKeyUp={(e) => enterkey(e)}
                  />

              </CardHeader>
              
              {/* <UserTableBody2  
                user = {users}
                reload = {reload}
                setReload = {setReload}
              /> */}
              <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                  {/* 테이블 헤더 이름 */}
                  <tr>
                    {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                    <th scope="col" />
                  </tr>
                </thead>
                {/* <tbody> */}
                  {users.list && users.list.map((user)=> <UserTableBody 
                                                            user = {user}
                                                            no ={user.no}
                                                            row_no = {user.row_no}
                                                            name = {user.name}
                                                            id = {user.id}
                                                            gender = {user.gender}
                                                            role = {user.role}
                                                            phone = {user.phone}
                                                            ssn = {user.ssn}
                                                            addr = {user.addr}
                                                            reg_date = {user.reg_date}
                                                            age = {ssnToAge(user.ssn)}
                                                            split_addr = {user.split_addr}
                                                            split_zonecode = {user.split_zonecode}
                                                            split_daddr = {user.split_daddr}
                                                            split_ssn1 = {user.split_ssn1}
                                                            split_ssn2 = {user.split_ssn2}
                                                            split_phone1 = {user.split_phone1}
                                                            split_phone2 = {user.split_phone2}
                                                            split_phone3 = {user.split_phone3}
                                                            reload = {reload}
                                                            setReload = {setReload}
                                                            renewalUser={renewalUser} 
                                                            setRenewalUser={setRenewalUser}
                                                            />)}


                                                         


                      {/* 드롭다운  */}
                      {/* <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>

                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              상세보기
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              수정
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              삭제
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td> */}
       
                {/* </tbody> */}
                </Table>

              {/* 페이징 */}
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <DivStyleFooterPaging>
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* 이전페이지 */}
                    <PaginationItem>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          if(pageInfo[1]){
                            setNowPage(page[0]-5);
                            getUserList(page[0]-5,search);
                        
                          }
                        }}
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    
                    {/* 페이지 */}
                    {page.map((num) => {
                      return <PaginationItem className={nowPage == num ? "active" : ""}>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            if(num <= pageInfo[0]){
                              setNowPage(num);
                              getUserList(num,search);
                            
                            }
                          }}>
                          {num}
                        </PaginationLink>
                      </PaginationItem>
                    })}

                    {/* 다음페이지 */}
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          if(pageInfo[2]){
                            setNowPage(page[4]+1);
                            getUserList(page[4]+1,search);
                            
                          }
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>


                  </Pagination>
                  </DivStyleFooterPaging>
                </nav>
              </CardFooter>
              </DivStyle>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserTable;