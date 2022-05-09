import React,{useState} from 'react';
import DeleteWarning from 'components/modal/public/DeleteWarning';
import 'assets/css/listSelectColor.css';

import {
    Table
} from "reactstrap";
import {
  Button,
  Modal,

} from "reactstrap";
import styled from "styled-components";
import { Fragment } from 'react/cjs/react.development';
const SpanStyle = styled.span`
    font-size: 20px;
    cursor: pointer;
`;


const BoardListTable = ({boards,setBoard,onClickTd,reload,setReload,user}) => {
    const tableTitle = ['No', '제목', '작성자', '조회수', '작성일','삭제']; // 빈 건 우측 드롭다운
    const [deleteModalState, setDeleteModalState] = useState({ isOpen: false });
    const [deleteNo,setDeleteNo]= useState();
    const onClickDeleteBtn = (no) => {

      console.log(no)
      setDeleteNo(no);
      setDeleteModalState({isOpen:true})
      // userDelete(no)
    
    }
    // 삭제인포 모달창에서 삭제버튼 눌렸을때
    function executDelete(){
      boardDelete(deleteNo)
    }
    //삭제
    const boardDelete = async(no) => {
      console.log(no)
      const response = await fetch(`http://localhost:8081/admin/board/${no}`, {
        method: "delete",
  
        // res에 결과가 들어옴
      })
      console.log(response)
          setReload(!reload);
          setDeleteModalState({isOpen:false})
          setBoard("")
          alert("삭제되었습니다.")

        
    };
    function closeDeleteModal() {
      setDeleteModalState({ isOpen: false })
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
          {boards.list && boards.list.map((board) => {
   
            return (
              <tr >
                {/* 행번호 */}
                <td onClick={(e) => { onClickTd(board,e) }}>{board.row_no}</td>
                {/* 제목 */}
                <td onClick={(e) => { onClickTd(board,e) }}>{board.title}</td>
                {/* 작성자 */}
                <th onClick={(e) => { onClickTd(board,e) }}>
                  <span className="mb-0 text-sm">{board.user_name}</span>
                </th>
                {/* 조회수 */}
                <td onClick={(e) => { onClickTd(board,e) }}>{board.hit}</td>
                {/* 작성일 */}
                <td onClick={(e) => { onClickTd(board,e) }}>{board.reg_date}</td>
                {/* 삭제버튼 */}
                {user.role === 999 || user.no === board.user_no
                  ? <td>
                    <SpanStyle onClick={(e)=>onClickDeleteBtn(board.no)}>✖</SpanStyle>
                    {/* <DeleteWarning id={board.no} deleteTarget={'admin/board'} reload={reload} setReload={setReload}></DeleteWarning> */}
                    </td>
                  : <td></td>
                }
                <td></td>

              </tr>
            )
          })}

        </tbody>

      </Table>

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

export default BoardListTable;