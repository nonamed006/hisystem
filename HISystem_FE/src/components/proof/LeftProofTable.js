import React from 'react';
import PatientListTableHeader from './PatientListTableHeader';
import PatientListTable from './PatientListTable';
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
const LeftProofTable = ({search,setSearch,inputSearch,onClickWrite,patient,setPatient,enterkey,patients,onClickTd,reload,setReload,pageInfo,setPageInfo,nowPage,getPatientList,page,setPage,setNowPage}) => {
    return (
         <div className="col">

    <Card className="shadow">
              <DivStyle>
                <PatientListTableHeader
                  search = {search}
                  inputSearch = {inputSearch}
                  onClickWrite = {onClickWrite}
                  patient = {patient}
                  enterkey = {enterkey}

                />
                <PatientListTable
                  setPatient={setPatient} 
                  patients={patients}
                  onClickTd={onClickTd}
                  reload={reload}
                  setReload={setReload}
                  patient={patient} 
                  />

                <Paging
                  pageInfo={pageInfo}
                  setPageInfo={setPageInfo}
                  nowPage={nowPage}
                  setNowPage={setNowPage}
                  getPatientList={getPatientList}
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
    );
};

export default LeftProofTable;