import React from 'react';
import { Fragment } from 'react/cjs/react.development';
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
  padding: 20px;
`;

const ch = window.innerHeight * 0.27;
const DivStyle2 = styled.div`
  padding: 25px 25px ${ch}px 25px;
  margin-left: 20px;
  `;


const BoardView = ({ board, user, onClickModifyBtn }) => {
  return (
    <Fragment>
      <CardHeader className="border-0">
        <Row>
          <Col md='11'>

            <h2 className="mb-4"
              style={{ height: "47px" }}

            >제목 : {board.title}</h2>
          </Col>
        </Row>
        <Form className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto">
          <FormGroup className="mb-0">
          </FormGroup>
        </Form>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">

          <tr>
            {<th scope="col">{"작성자 : "} {board.user_name}  </th>}
            {<th scope="col">{"작성일 : "} {board.reg_date}  </th>}
            {<th scope="col">{"조회수 : "} {board.hit}  </th>}
            <th scope="col" />
          </tr>

        </thead>

        <tbody

          style={{ height: "422px" }}
          className={'ws'}
        >
          <DivStyle2>
            {/* {board.contents && (
              <pre>
                {board.contents.split("\n").map((line) => {
                  return (
                    <span>{line}
                      <br />
                    </span>
                  )
                })}
              </pre>
            )} */}
                <span style={{ whiteSpace: 'pre-wrap' }} >{board.contents}</span>
          </DivStyle2>
        </tbody>
      </Table>
      <CardFooter className="py-0">
        <nav aria-label="...">
          {console.log(board)}
          {
            board.user_no == ""
              ? null
              : user.role === 999 || user.no === board.user_no
                ? <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    style={{ float: 'right' }}

                    onClick={onClickModifyBtn}
                  // onClick={() => {setModalState(Object.assign({}, modalState, {isOpen: false})) } }
                  // onClick={() => { () => setModalState({isOpen: false}) }}
                  > 수정하기
                  </Button>
                </div>
                : null
          }
        </nav>
      </CardFooter>
    </Fragment>
  );
};

export default BoardView;