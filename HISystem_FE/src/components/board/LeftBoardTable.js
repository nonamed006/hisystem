import React from 'react';
import BoardListTableHeader from './BoardListTableHeader';
import BoardListTable from './BoardListTable';
import Paging from './Paging';


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

const h = window.innerHeight * 0.7;

const DivStyle = styled.div`
  height: ${h}px;

`;



const LeftBoardTable = ({search,setSearch,inputSearch,onClickWrite,user,enterkey,boards,setBoard,onClickTd,reload,setReload,pageInfo,setPageInfo,nowPage,getBoardList,page,setPage,setNowPage}) => {
    return (
        <Col>
            <div className="col">
              <Card className="shadow">
              <DivStyle>
                <BoardListTableHeader
                  search = {search}
                  inputSearch = {inputSearch}
                  onClickWrite = {onClickWrite}
                  user = {user}
                  enterkey = {enterkey}

                />
                <BoardListTable
                  setBoard = {setBoard}
                  boards={boards}
                  onClickTd={onClickTd}
                  reload={reload}
                  setReload={setReload}
                  user={user} 
                  />

                <Paging
                  pageInfo={pageInfo}
                  setPageInfo={setPageInfo}
                  nowPage={nowPage}
                  setNowPage={setNowPage}
                  getBoardList={getBoardList}
                  page={page}
                  setPage={setPage}
                  nowPage={nowPage}
                  setNowPage={setNowPage}
                  search={search}
                  setSearch={setSearch}
                />
                </DivStyle>
              </Card>
            </div>
          </Col>
    );
};

export default LeftBoardTable;