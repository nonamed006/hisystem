/*eslint-disable*/
import React, { useState } from 'react';
import DeleteWarning from 'components/modal/public/DeleteWarning';
// import BoardDetailModal from 'components/modal/BoardDetailModal';


import {
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
import { useEffect } from 'react/cjs/react.development';
// import UserModifyModal from 'components/modal/UserModifyModal';

export default function ({ no, row_no, title, contents, hit, user_no, user_name, reg_date,reload,setReload }) {


    const [modalState, setModalState] = useState({ isOpen: false });
    const [deleteNo,setDeleteNo]= useState();

    const onClickDeleteBtn = (no) => {

        console.log(no)
        setDeleteNo(no);
        setDeleteModalState({isOpen:true})
        // userDelete(no)
    
      }
    return (
        <Fragment>
        <tbody >
            <tr >
                {/* 행번호 */}
                <td onClick={() => setModalState({ isOpen: true })}>{row_no}</td>
                {/* 제목 */}
                <td onClick={() => setModalState({ isOpen: true })}>{title}</td>
                {/* 작성자 */}
                <td onClick={() => setModalState({ isOpen: true })}>{user_name}</td>
                {/* 조회수 */}
                <td onClick={() => setModalState({ isOpen: true })}>{hit}</td>
                {/* 작성일 */}
                <td onClick={() => setModalState({ isOpen: true })}>{reg_date}</td>

                
                {/* 삭제버튼 */}
                <td>
                {/* <SpanStyle onClick={(e)=>onClickDeleteBtn(user.no)}>✖</SpanStyle> */}
                    {/* <DeleteWarning id={no} deleteTarget={'admin/board'} reload={reload} setReload={setReload}></DeleteWarning> */}
                    </td>

            </tr>

          
        </tbody>
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
