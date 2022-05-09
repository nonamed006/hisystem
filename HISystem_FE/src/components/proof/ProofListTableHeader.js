import InputBox from 'components/input/InputBox';

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

const DivStyle = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 33px 30px 10px 30px;
`;
const ProofListTableHeader = ({ search, inputSearch, onClickWrite, patient, enterkey }) => {
    return (
        <CardHeader className="border-0">
        <Row>
  
          <Col md='2'>
            <Button color="primary" type="button" size='sm'>
              진료 기록
            </Button>
          </Col>
       
        </Row>
          <DivStyle></DivStyle>
          {/* <InputBox placeholder="Search" type="text"
            value={search}
            onChange={inputSearch}
            onKeyUp={(e) => enterkey(e)}
          /> */}
  
  
  
  
  
  
  
      </CardHeader>
    );
};

export default ProofListTableHeader;