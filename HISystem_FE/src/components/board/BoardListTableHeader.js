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

const BoardListTableHeader = ({ search, inputSearch, onClickWrite, user, enterkey }) => {
  return (
    <CardHeader className="border-0">
      <Row>

        <Col md='2'>
          <Button color="primary" type="button" size='sm'>
            공지사항
          </Button>
        </Col>
        {user.role === 9 || user.role === 999 ?
          <Col md='10'>
            <Button
            size='sm'
              color="primary"
              // type="submit"
              outline
              type="submit"
              style={{ float: 'right' }}
              onClick={onClickWrite}
            > 글 쓰기

            </Button>
          </Col>

          : null
        }
      </Row>

        <InputBox placeholder="Search" type="text"
          value={search}
          onChange={inputSearch}
          onKeyUp={(e) => enterkey(e)}
        />







    </CardHeader>
  );
};

export default BoardListTableHeader;