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

  // const DivStyleFooterBtn = styled.div`
  // position : absolute;
  // top: 590px;
  // left: 465px
  
  // `;

  const w = window.innerWidth * 0.28;
  const h = window.innerHeight * 0.62;
  const DivStyleFooterPaging = styled.div`
  position : absolute;
  top: ${h}px;
  left: ${w}px;
  
  `;

const RightPaging = ({ patientNo, rightPageInfo , setRightPageInfo,patient,  nowRightPage, rightPage,  setRightPage, setNowRightPage,  getProofList}) => {
  console.log(patient)
  console.log(rightPageInfo)

  console.log(nowRightPage)
  console.log(patientNo)

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
                  if (rightPageInfo[1]) {
                    setNowRightPage(rightPage[0] - 5);
                    getProofList(patientNo,rightPage[0] - 5 );

                  }
                }}
              >
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>

            {/* 페이지 */}
            {rightPage && rightPage.map((num) => {
              return <PaginationItem className={nowRightPage == num ? "active" : ""}>
                <PaginationLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    if (num <= rightPageInfo[0]) {
                      console.log('123123')
                      setNowRightPage(num);
                      getProofList(patientNo,num);

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
                  console.log(rightPageInfo[2])
                  console.log(rightPage[4]+1)
                  if (rightPageInfo[2]) {
                    setNowRightPage(rightPage[4] + 1);
                    getProofList(patientNo,rightPage[4] + 1);

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

export default RightPaging;