import React, {useRef} from 'react';
import { ReactToPrint } from 'react-to-print';
// import Divider from '@mui/material/Divider';


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
    Modal,
    CardBody,
    
    Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Col
} from "reactstrap";
import styled from 'styled-components';
import { isWhiteSpaceLike } from 'typescript';

const DivStyle = styled.div`
  border-top: 1px solid #e9ecef;
  margin: 43px 0px 0px 0px;
  padding: 100px 30px 10px 30px;
`;

const PrintInformModal = ({ proof, printInformModalState, setPrintInformModalState, onClickPrint }) => {
    const componentRef = useRef();

    function closePrintModal() {
        setPrintInformModalState({ isOpen: false })
        console.log("끄기")

    }

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current
    // });

    const printProof = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8081/admin/proof/print`, {
            method: "post",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(proof)
            // res에 결과가 들어옴
        }).then((res) => res.json())
            .then((res) => {
                console.log("보내기성공")
            });
    };

    function onClickPrint(e) {
        setPrintInformModalState({ isOpen: false })
        const html = document.querySelector('html');
        const printContents = document.querySelector('.modal-body').innerHTML;
        console.log(printContents)
        const printDiv = document.createElement('div');
        printDiv.className = "print-div";
        
        html.appendChild(printDiv);
        printDiv.innerHTML = printContents;
        document.body.style.display = 'none';
        window.print();
        document.body.style.display = 'block';
        printDiv.style.display = 'none';
        // printDiv.removeChild();
        // printProof(e);
    }
    return (
        <Modal
            className="modal-dialog-centered"
            size="XXL"
            style={{ maxWidth: '700px', width: '100%', backgroundColor: 'white' }}
            isOpen={printInformModalState.isOpen}
            toggle={closePrintModal}
        // toggle={ () => setRegisterModalState({isOpen: false}) }
        >
        <ReactToPrint
            trigger={printInformModalState.isOpen}
            content ={componentRef.current}
        />
<div style={{ display: 'none' }}>
                    <div id="printPdf" ref={componentRef}>
                        <Card style={{ height: '100%' }}>
                            <span style={{ fontSize: '20px', display: 'block', textAlign: 'center' }}>처 방 전</span>
                            {/* <Divider /> */}
                            <div 
                            // className={classes.Line}
                            >
                                <div 
                                // className={classes.addon}
                                >
                                    {/* <PersonIcon style={{ fontSize: "25px", color: "#616161" }} /> */}
                                </div>
                                {/* <InputText
                                    placeholder="환자명"
                                    // className={classes.textStyle}
                                    // value={patientItem.name} 
                                    /> */}
                                    <strong>환자이름</strong>
                                    {proof.patient_name}
                            </div>
                            <div 
                            // className={classes.Line}
                            >
                                <div 
                                // className={classes.addon}
                                >
                                    {/* <BlurOnIcon style={{ fontSize: "25px", color: "#616161" }} /> */}
                                </div>
                                {/* <InputText
                                    placeholder="질병"
                                    // className={classes.textStyle}
                                    // value={diagnosisItem.diseaseNm} 
                                    /> */}
                                    <strong>담당의</strong>
                                    {proof.doctor_name}
                            </div>
                            <div className="card">
                                {/* <DataTable
                                //  value={prescriptionItems}
                                    dataKey="diseaseNo" paginator rows={10}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items">

                                
                                </DataTable> */}
                                    <strong>진단일</strong>
                                    {proof.diag_date}
                            </div>
                            <div className="card">

                                    <strong>병명</strong>
                                    {proof.diease_kr}/{proof.diease_en}
                            </div>
                            <div className="card">

                                    <strong>소견</strong>
                                    {proof.remark}
                            </div>

                            <div className="card">

                                    <strong>접수자</strong>
                                    {proof.staff_name}
                            </div>
                        </Card>
                    </div>
                </div>
        </Modal>
    );
};

export default PrintInformModal;