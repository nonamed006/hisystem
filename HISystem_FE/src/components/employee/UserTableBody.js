/*eslint-disable*/
import React, { useState } from 'react';
import DeleteWarning from 'components/modal/public/DeleteWarning';
import UserDetailModal from 'components/modal/UserDetailModal';

// import UserModifyModal from 'components/modal/UserModifyModal';
import styled from "styled-components";
import { Fragment } from 'react/cjs/react.development';
const SpanStyle = styled.span`
    font-size: 20px;
    cursor: pointer;
`;
import {
  Button,
  Modal,

} from "reactstrap";

export default function ({ user, no, id, split_addr, split_zonecode, split_daddr, split_ssn1, split_ssn2, split_phone1, split_phone2, split_phone3, reload, setReload, renewalUser, setRenewalUser
  // ,role, phone, ssn, addr, reg_date ,row_no, name, age, gender,
}) {
  console.log("-------------------------" + no)
  const onClickTd = (e) => {
    //색 삭제
    if (document.getElementsByClassName("tr-color")[0]) {
      document.getElementsByClassName("tr-color")[0].classList.remove("tr-color");
    }
    //색 변경
    e.target.parentNode.classList.add('tr-color');
    setModalState({ isOpen: true })

  }
  const [modalState, setModalState] = useState({ isOpen: false });
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false });
  const [deleteNo,setDeleteNo]= useState();
  // const [reload, setReload] = useState(false); // 삭제로 인한 리로드 체크

  // const [checkModalContent,setCheckModalContent] = useState({isModify: false});
  // class UserTableBody extends React.Component {

  //     const changeModalContent = (e) =>{
  // console.log("123")
  // console.log(e.target.value)
  // setCheckModalContent(Object.assign({}, checkModalContent, {isModify: !(checkModalContent)}))
  // console.log(checkModalContent)
  // }

  const onClickDeleteBtn = (no) => {

    console.log(no)
    setDeleteNo(no);
    setDeleteModalState({isOpen:true})
    // userDelete(no)

  }
  function executDelete(){
    userDelete(deleteNo)
  }

  const userDelete = async(no) => {
    console.log(no)
    const response = await fetch(`http://localhost:8081/admin/user/${no}`, {
      method: "delete",

      // res에 결과가 들어옴
    })
    console.log(response)
        setReload(!reload);
        setDeleteModalState({isOpen:false})
        alert("삭제되었습니다.")
  };

  function closeDeleteModal() {
    setDeleteModalState({ isOpen: false })
}


  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));
  //   render(){
  return (
    <Fragment>
        <tbody >
            <tr >
                {/* 행번호 */}
                <td onClick={(e) => onClickTd(e) }>{user.row_no}</td>
                {/* 이름 */}
                <th onClick={(e) => onClickTd(e) }>
                  <span className="mb-0 text-sm"> {user.name} </span>
                </th>
                {/* 나이 */}
                <td onClick={(e) => onClickTd(e) }>{ssnToAge(user.ssn)}</td>
                {/* 성별 */}
                <td onClick={(e) => onClickTd(e) }>
                {
                        (function () {
                          if (user.gender === 'M') return (<span>남자</span>);
                          if (user.gender === 'F') return (<div>여자</div>);                       
                        })()
                      }</td>
                {/* id */}
                <td onClick={(e) => onClickTd(e) }>{id}</td>
                {/* 직무 */}
                <td onClick={(e) => onClickTd(e) }>
                {
                        (function () {
                          if (user.role === 1) return (<span>원무과</span>);
                          if (user.role === 2) return (<div>간호사</div>);
                          if (user.role === 3) return (<div>수간호사</div>);
                          if (user.role === 4) return (<div>의사</div>);
                          if (user.role === 9) return (<div>관리자</div>);
                        })()
                      }</td>
                
                {/* 삭제버튼 */}
                {/* <td><UserDeleteWarning no={no} reload={reload} setReload={setReload} ></UserDeleteWarning></td> */}
                <td >
                <SpanStyle onClick={(e)=>onClickDeleteBtn(user.no)}>✖</SpanStyle>
                  {/* <DeleteWarning id={user.no} deleteTarget={'admin/user'} reload={reload} setReload={setReload}></DeleteWarning> */}
                  </td>

            </tr>

            <UserDetailModal 
                user={user}
                no ={user.no}
                name = {user.name}
                id = {user.id}
                gender = {user.gender}
                role = {user.role}
                phone = {user.phone}
                ssn = {user.ssn}
                addr = {user.addr}
                reg_date = {user.reg_date}
                age = {ssnToAge(user.ssn)}
                split_addr = {split_addr}
                split_zonecode = {split_zonecode}
                split_daddr = {split_daddr}
                split_ssn1 = {split_ssn1}
                split_ssn2 = {split_ssn2}
                split_phone1 = {split_phone1}
                split_phone2 = {split_phone2}
                split_phone3 = {split_phone3}
                setModalState = {setModalState}
                modalState = {modalState}
                reload = {reload}
                setReload = {setReload}
                />
        </tbody>


              {/* 삭제 인포모달 */}
                    <Modal
                            className="modal-dialog-centered modal-danger"
                            contentClassName="bg-gradient-danger"
                            isOpen={deleteModalState.isOpen}
                            toggle={closeDeleteModal}
                        >
                            {/* 모달 내용 */}
                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-notification">
                                    caution
                                </h6>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={closeDeleteModal}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="py-3 text-center">
                                    <i className="ni ni-bell-55 ni-3x" />
                                    <h4 className="heading mt-4">정말 삭제 하시겠습니까?</h4>
                                    <p>
                                        삭제 후 복구가 불가능합니다.
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button className="btn-white" color="default" type="button"
                                    onClick={
                                      executDelete}>
                                    삭제
                                </Button>
                                <Button
                                    className="text-white ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={closeDeleteModal}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal>
</Fragment>
  );

};