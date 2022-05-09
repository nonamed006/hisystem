import React from 'react';
import PatientListTableHeader from './PatientListTableHeader';
import ProofListTable from './ProofListTable';
import ProofListTableHeader from './ProofListTableHeader'
import RightPaging from './RightPaging';
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
const RightProofTable = ({patientNo,onClickProof,proofs,search,setSearch,inputSearch,onClickWrite,patient,setPatient,enterkey,patients,onClickTd,reload,setReload,getProofList, rightPageInfo ,setRightPageInfo,nowRightPage,rightPage,setRightPage,setNowRightPage
}) => {
    return (
        <div className="col">

        <Card className="shadow">
                  <DivStyle>

                    <ProofListTableHeader
                    search = {search}
                    inputSearch = {inputSearch}
                    onClickWrite = {onClickWrite}
                    patient = {patient}
                    enterkey = {enterkey}
                    />

                    <ProofListTable
                      proofs = {proofs}
                      onClickProof={onClickProof}
                      />
    
                    <RightPaging
                      rightPageInfo = {rightPageInfo}
                      setRightPageInfo={setRightPageInfo}
                      nowRightPage={nowRightPage}
                      rightPage={rightPage}
                      setRightPage={setRightPage}
                      setNowRightPage={setNowRightPage}
                      patient = {patient}
                      getProofList={getProofList}
                      patientNo = {patientNo}

                    />
                    </DivStyle>
                  </Card>
              </div>
    );
};

export default RightProofTable;