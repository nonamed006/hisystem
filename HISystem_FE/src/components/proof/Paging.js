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

  import styled from "styled-components";
  
  const w = window.innerWidth * 0.23;
  const h = window.innerHeight * 0.62;
  const DivStyleFooterPaging = styled.div`
  position : absolute;
  top: ${h}px;
  left: ${w}px;
  `;

const Paging = ({pageInfo, setPageInfo, nowPage,setNowPage,getPatientList,page,setPage,
    search,setSearch}) => {
      console.log('----------------')
      console.log(pageInfo)
      console.log(page)
      console.log(nowPage)
      console.log('````````````````````````')



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
                    getPatientList(page[0] - 5, search);

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
                      getPatientList(num, search);

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
                    getPatientList(page[4] + 1, search);

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