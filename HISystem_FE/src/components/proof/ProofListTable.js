import React, { Fragment, useEffect, useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import { useReactToPrint } from 'react-to-print';
import printerImg from 'assets/img/printerImg/printer.png';
import {
  Table,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";
import styled from 'styled-components';

const DivStyle = styled.div`
  border: none;
  margin: 50px 0px 0px 30px;
  padding: 30px 30px 10px 30px;
`;

const HeaderWrapStyle = styled.div`
  
  margin: 50px 30px 10px 30px;
  padding: 30px 30px 10px 30px;

`;

const RemarkStyle = styled.div`
border :1px solid ;
margin: 50px 30px 10px 30px;
padding: 30px 30px 10px 30px;
`

const ContentHeaderStyle = styled.div`

`
const HeaderStyle = styled.div`

border-bottom :1px solid ;


`
const ContentContianerStyle = styled.div`
border :1px solid ;

width:900px;
height: 1260px;
position: absolute;
left: 10%

`


const ProofListTable = ({ proofs, onClickProof }) => {
  const tableTitle = ['No', '환자이름', '병명', '진단일', '담당의', '접수자', '출력']; // 빈 건 우측 드롭다운
  const [proof, setProof] = useState({
    diag_no: "",
    row_no: "",
    patient_name: "",
    diseases_kr: "",
    diseases_en: "",
    remark: "",
    doctor_name: "",
    staff_name: ""

  });
  const [medicine, setMedicine] = useState({

  })
  const [proofNum, setProofNum] = useState("1")

  const [printInformModalState, setPrintInformModalState] = useState({ isOpen: false })

  const componentRef = useRef();

  // 출력 내용에 proof값들 넣어줘야해서 proof에 set해줌
  const onClickPrintImg = (proof, e) => {
    console.log("1234")
    getMedicine(proof)
    setProof(proof);
    setPrintInformModalState({ isOpen: true })
    // handlePrint();
  }
  function closePrintModal() {
    setPrintInformModalState({ isOpen: false })
    setProofNum("1")

  }


  // 상태값 안들어가서 첫 출력할때 내용 안나오는것 보완
  // useEffect(() => {
  //   if (proof.row_no) {
  //     handlePrint();
  //   }
  // }, [proof])


  // 프린트 컴포넌트 활성화시켜줌
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  // 진료기록에서 진료 선택햇을 때 진단번호로 처방전 내역 가져옴
  var getMedicine = (proof) => {
    console.log(proof.diag_no)
    fetch(`http://localhost:8081/admin/proof/medicine/${proof.diag_no}`, {
      method: "get",

      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setMedicine(res);
        console.log(res)
      });
  };
  function onClickProofKind(e) {
    console.log(e.target.value)
    setProofNum(e.target.value)
  }
  function onClickPrintBtn(e) {
    e.preventDefault();
    console.log(proofNum)
    handlePrint();

  }

  //날짜 포멧설정
  function formattingDate(Idate) {
    let date = new Date(Idate);
    let formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatDate
  }

  return (
    <Fragment>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          {/* 테이블 헤더 이름 */}
          <tr>
            {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
            <th scope="col" />
          </tr>
        </thead>
        <tbody >
          {proofs.list && proofs.list.map((proof) => {

            return (
              <tr >

                {/* 행번호 */}
                <td onClick={(e) => { onClickProof(proof, e) }}>{proof.row_no}</td>
                {/* 병명 */}
                <td onClick={(e) => { onClickProof(proof, e) }}>{proof.patient_name}</td>
                {/* 제목 */}
                <td onClick={(e) => { onClickProof(proof, e) }}>{proof.diseases_kr}</td>
                {/* 진단일 */}
                <td onClick={(e) => { onClickProof(proof, e) }}>{formattingDate(proof.diag_date)}</td>
                {/* 담당의 */}
                <td onClick={(e) => { onClickProof(proof, e) }}>{proof.doctor_name}</td>
                {/* 접수자 */}
                <td onClick={(e) => { onClickProof(proof, e) }}>{proof.staff_name}</td>

                <td onClick={(e) => { onClickPrintImg(proof, e) }} style={{ cursor: 'pointer' }}><img src={printerImg} width="30px" height="30px" /> </td>
                <td></td>
              </tr>
            )
          })}

        </tbody>

        <div style={{ display: 'none' }}>
          <div id="printPdf" ref={componentRef}>
            {/* <Card style={{ height: '100%' }}> */}
            <HeaderWrapStyle>
              {proofNum === "1"
                ? <span style={{ fontSize: '60px', display: 'block', textAlign: 'center' }}>진단서</span>
                : <span style={{ fontSize: '60px', display: 'block', textAlign: 'center' }}>처방전</span>
              }

            </HeaderWrapStyle>
            <ContentContianerStyle>
              <HeaderStyle>
                <div>

                  {proofNum === "1"
                    ?
                    <div style={{ display: "flex", justifyContent: 'space-around' }}>
                      <div>
                        <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>진단번호</strong>
                        <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.diag_no}</span>
                      </div>
                      <div>
                        <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>진단일</strong>
                        <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{formattingDate(proof.diag_date)}</span>
                      </div>
                      <div>
                        <strong style={{ fontSize: '30px', display: 'block', textAlign: 'right' }}>접수자</strong>
                        <span style={{ fontSize: '30px', display: 'block', textAlign: 'right' }}>{proof.staff_name}</span>
                      </div>
                      <div>
                        <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>환자이름</strong>
                        <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.patient_name}</span>
                      </div>
                    </div>

                    :<div style={{ display: "flex", justifyContent: 'space-around' }}>
                     <div>
                      <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>처방번호</strong>
                      <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{medicine.diag_no}</span>
                    </div>
                    <div>
                      <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>처방일</strong>
                      <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{formattingDate(medicine.diag_date)}</span>
                    </div>
                     <div>
                      <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>환자이름</strong>
                      <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{medicine.patient_name}</span>
                    </div>
                   </div>


                  }
                </div>
                {/* <div>
                  {proofNum === "1"
                    ? <div>
                      <strong style={{ fontSize: '30px', display: 'block', textAlign: 'right' }}>접수자</strong>
                      <span style={{ fontSize: '30px', display: 'block', textAlign: 'right' }}>{proof.staff_name}</span>
                    </div>
                    : null
                  }
                </div> */}
              </HeaderStyle>
              {/* <DivStyle>

              </DivStyle> */}
              {/* <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>환자이름</strong>
                {proofNum === "1"
                  ?<div>
                    <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>환자이름</strong>
                    <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.patient_name}</span>
                   </div>
                  :<div>
                    <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>환자이름</strong>
                    <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{medicine.patient_name}</span>
                   </div>
                }
              </DivStyle> */}

              <DivStyle>
                <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>담당의사</strong>
                {proofNum === "1"
                  ? <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.doctor_name}</span>
                  : <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{medicine.doctor_name}</span>
                }

              </DivStyle>

              {/* <DivStyle>

                {proofNum === "1"
                  ? <div>
                    <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>진단일</strong>
                    <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{formattingDate(proof.diag_date)}</span>
                  </div>
                  : <div>
                    <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>처방일</strong>
                    <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{formattingDate(medicine.diag_date)}</span>
                  </div>
                }
              </DivStyle> */}

              <DivStyle>
                {proofNum === "1"
                  ? <div>
                    <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>병명</strong>
                    <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.diseases_kr}/{proof.diseases_en}</span>
                  </div>
                  : <div>
                    <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>처방약품</strong>
                    <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{medicine.medicine_nm}</span>
                  </div>
                }
              </DivStyle>

              <DivStyle>
                {proofNum === "1"
                  ? <div>
                    <strong style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>소견</strong>
                    <span style={{ fontSize: '30px', display: 'block', textAlign: 'left' }}>{proof.remark}</span>
                  </div>
                  : <DivStyle>
                  </DivStyle>
                }
              </DivStyle>


            </ContentContianerStyle>
            {/* </Card> */}
          </div>
        </div>
      </Table>


      <Modal
        className="modal-dialog-centered"
        size="sm"
        isOpen={printInformModalState.isOpen}
        toggle={closePrintModal}
      >

        {/* <div className="modal-header">
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={closePrintModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div> */}
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              {/* header 문구 */}
              <div className="text-center text-muted mb-4">
                <strong>증명서 출력</strong>
              </div>
              <Form
                role="form"
              >
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">

                    <select className="custom-select d-block w-100" id="root"
                      id="name"
                      name="name"
                      onChange={(e) => onClickProofKind(e)}
                    // value={duty.user_no}
                    >
                      <option value='1'>진단서</option>
                      <option value='2'>처방전</option>

                    </select>
                  </InputGroup>
                </FormGroup>
                {/* 출력하기 버튼 */}
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"

                    onClick={(e) => onClickPrintBtn(e)}
                  > 출력하기

                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ProofListTable;