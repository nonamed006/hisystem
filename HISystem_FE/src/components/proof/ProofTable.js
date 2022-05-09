/*eslint-disable*/
import PatientAddModal from 'components/modal/PatientAddModal';
import DeleteWarning from 'components/modal/public/DeleteWarning';
import React, { useEffect, useState } from 'react';
import LeftProofTable from './LeftProofTable';
import RightProofTable from './RightProofTable';
import PrintInformModal from './PrintInformModal';
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
// core components

const ProofTable = () => {

  const tableTitle = ['No',' 환자이름', '질병영어', '질병한글', '소견', '진단일',  '']; // 빈 건 우측 드롭다운

  const [page, setPage] = useState([]); // page button 
  const [pageInfo, setPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowPage, setNowPage] = useState(1); // 현재 page

  const [rightPage, setRightPage] = useState([]); // 제증명 page button 
  const [rightPageInfo, setRightPageInfo] = useState([]); // 0: endpage / 1: 이전 / 2: 이후
  const [nowRightPage, setNowRightPage] = useState(1); // 현재 page
  

  const [search, setSearch] = useState('');     // 검색어 

  const [proofs, setProofs] = useState([]); // 제증명 list
  const [proof, setProof] = useState([]); // 제증명
  const [patients, setPatients] = useState([]);
  const [reload, setReload] = useState(false); 
  const [patient, setPatient]= useState();
  const [patientNo, setPatientNo] = useState();

  // tr 색 변경용 상태값
  const [changeModify, setChangeModify] = useState(false)
  const [changeWrite, setChangeWrite] = useState(false)


  //제증명 선택 모달
  const [closePrintInformModal, setClosePrintInformModal]= useState({ isOpen: false });
  const [printInformModalState, setPrintInformModalState]= useState({ isOpen: false });
  

  useEffect(() => {
    getPatientList(nowPage, search);
    // getProofList(nowPage,search);
  }, [reload]);


  var getPatientList = (page,kwd) => {
    // ajax
    fetch(`http://localhost:8081/admin/proof/patient/${page}/${kwd == '' ? 'notSearch' : kwd}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setPatients(res);
        // let postNum = user.addr.substring(0,)
        
        let sp = res.beginPage;
        let ep = res.endPage;
        let tmp = [];
        let index = 0;
        for(var i = sp; i <= ep; i++){
          tmp[index++] = i;
        }
        
        setPage(tmp);
        setPageInfo([res.totalCount, res.isPrevPage, res.isNextPage]);

      });
  };


  // 증명서 목록 가져오기 클릭한 환자(진료완료인)에 한해 병명, 담당의 ,접수자 리스트를 가져옴
  var getProofList = (no,rightPage) => {

    fetch(`http://localhost:8081/admin/proof/${rightPage}/${no}`, {
      method: "get",

      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setProofs(res);
        let sp = res.beginPage;
        let ep = res.endPage;
        let tmp = [];
        let index = 0;
        for (var i = sp; i <= ep; i++) {
          tmp[index++] = i;
        }
        setRightPage(tmp);
        setRightPageInfo([res.totalCount, res.isPrevPage, res.isNextPage]);
      });
  };

 
  
    // 검색창
    const inputSearch = (e) => {

      setSearch(e.target.value);
    };
  
    function enterkey(e) {
      e.preventDefault();
      /**
       * inputbox내용 변경시 동작하는부분
       */



      //다 지우고 엔터키 눌럿을때 동작하는부분
      if (window.event.keyCode == 13) {
        setProofs("")

        setNowPage(1);
        getPatientList(1, search);
        // setSearch('');
      }
    }

    const onClickTd = (patient,e) => {

      //색 삭제
         if(document.getElementsByClassName("tr-color")[0]){
        document.getElementsByClassName("tr-color")[0].classList.remove("tr-color");
      }
      //색 변경
      e.target.parentNode.classList.add('tr-color');
      // setNowRightPage(1);
      setPatientNo(patient.no)
     
    }

    useEffect(() => {
      if(patientNo){
      getProofList(patientNo,nowRightPage);
      setChangeModify(false);
      setChangeWrite(false);
      setNowRightPage(1);
      }
    }, [patientNo]);


    // 제증명란 행 클릭시 글자 색상변경
    const onClickProof = (proof,e) => {
      
      //색 삭제
      if(document.getElementsByClassName("proofTr-color")[0]){
        document.getElementsByClassName("proofTr-color")[0].classList.remove("proofTr-color");
      }
      //색 변경
      e.target.parentNode.classList.add('proofTr-color');
      // setNowRightPage(1);
      // getProofList(patient,nowRightPage);
      setChangeModify(false);
      setChangeWrite(false);
      // setNowRightPage(1);
    }
    // 출력할 정보 보내기
    // const onClickPrintBtn = (proof,e) => {
    //   getMedicine(proof);
    //   //색 삭제
    //   if(document.getElementsByClassName("proofTr-color")[0]){
    //     document.getElementsByClassName("proofTr-color")[0].classList.remove("proofTr-color");
    //   }
    //   //색 변경
    //   e.target.parentNode.classList.add('proofTr-color');
    //   // setNowRightPage(1);
      
    //   setProof(proof);
    //   setPrintInformModalState({isOpen:true})
    //   // printProof(proof);
    //   setChangeModify(false);
    //   setChangeWrite(false);
    //   // setNowRightPage(1);
    // }

    
    function onClickWrite(e) {
      e.preventDefault();
      setChangeWrite(true)
      setChangeModify(false);
    }
    
  // 신규등록 버튼
  const btvEventInsertPatient = (e) => {
    e.preventDefault();
    alert('신규등록모달띄우기');
  };




  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>

        <LeftProofTable
            search = {search}
            setSearch={setSearch}
            inputSearch = {inputSearch}
            onClickWrite = {onClickWrite}
            patient = {patient}
            setPatient ={setPatient}
            enterkey = {enterkey}
            patients={patients}
            onClickTd={onClickTd}
            reload={reload}
            setReload={setReload}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            nowPage={nowPage}
            getPatientList={getPatientList}
            page={page}
            setPage={setPage}
            setNowPage={setNowPage}
          />
        {/* 오른쪽테이블 */}
        <RightProofTable 
                patient = {patient}
                proofs ={proofs}
                reload={reload}
                setReload={setReload}
                rightPageInfo = {rightPageInfo}
                setRightPageInfo={setRightPageInfo}
                nowRightPage={nowRightPage}
                rightPage={rightPage}
                setRightPage={setRightPage}
                setNowRightPage={setNowRightPage}
                // onClickPrintBtn = {onClickPrintBtn}
                getProofList = {getProofList}
                onClickProof = {onClickProof}
                patientNo = {patientNo}
                />
        </Row>
	
        <PrintInformModal
          printInformModalState = {printInformModalState}
          setPrintInformModalState = {setPrintInformModalState}
          proof = {proof}
          // duty={duty}
					// setDuty={setDuty}
					// nurseList={nurseList}
					// registerModalState={registerModalState}
					// setRegisterModalState={setRegisterModalState}
					// reload={reload}
					// setReload={setReload}
				/>
    
  
      </Container>
    </>
  );
};

export default ProofTable;