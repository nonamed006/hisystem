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
import { updateAsExpression } from 'typescript';

const PatientListTableHeader = ({ search, inputSearch, onClickWrite, patient, enterkey }) => {
  return (
    <CardHeader className="border-0">
      <Row>

        <Col md='2'>
          <Button color="primary" type="button" size='sm'>
            환자 리스트
          </Button>
        </Col>
     
      </Row>

        <InputBox placeholder="Search" type="text"
          value={search}
          onChange={inputSearch}
          onKeyUp={(e) => enterkey(e)}
        />







    </CardHeader>
  );
};

export default PatientListTableHeader;