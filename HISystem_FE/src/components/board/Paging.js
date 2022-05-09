import React from 'react';


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
//페이징용 높낮이
const pw = window.innerWidth * 0.286;
const ph = window.innerHeight * 0.62;
const DivStyleFooterPaging = styled.div`
position : absolute;
top: ${ph}px;
left: ${pw}px;

`;

const Paging = ({pageInfo, setPageInfo, nowPage,setNowPage,getBoardList,page,setPage,
    search,setSearch}) => {
    return (
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
                  if (pageInfo[1]) {
                    setNowPage(page[0] - 5);
                    getBoardList(page[0] - 5, search);

                  }
                }}
              >
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>

            {/* 페이지 */}
            {page && page.map((num) => {
              return <PaginationItem className={nowPage == num ? "active" : ""}>
                <PaginationLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    if (num <= pageInfo[0]) {
                      setNowPage(num);
                      getBoardList(num, search);

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
                  if (pageInfo[2]) {
                    setNowPage(page[4] + 1);
                    getBoardList(page[4] + 1, search);

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
    );
};

export default Paging;