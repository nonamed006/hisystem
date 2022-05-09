import React from 'react';
import BoardWrite from './BoardWrite';
import BoardView from './BoardView';


import {
    Card,
    Col
} from "reactstrap";
import styled from 'styled-components';
import { useEffect } from 'react/cjs/react.development';

  const h = window.innerHeight * 0.7;

  const DivStyle = styled.div`
  height: ${h}px;
`;





const RightBoardTable = ({board,setBoard,reload,setReload,changeWrite,setChangeWrite,setChangeModify,changeModify,user,onClickModifyBtn}) => {
    return (
        <Col>
        <div className="col">
          <Card className="shadow">
          <DivStyle>
            {/* aa3 */}
            {changeWrite === true
              ?
              <BoardWrite
                header_title="글 쓰기"
                board = {board}
                setBoard = {setBoard}
                reload={reload}
                setReload={setReload}
                changeWrite={changeWrite}
                setChangeWrite={setChangeWrite}
                changeModify={changeModify}
                setChangeModify={setChangeModify}
              />
              :
              changeModify === true
                ?
                <BoardWrite
                  header_title="수정하기"
                  board = {board}
                  setBoard = {setBoard}
                  reload={reload}
                  setReload={setReload}
                  changeWrite={changeWrite}
                  setChangeWrite={setChangeWrite}
                  changeModify={changeModify}
                  setChangeModify={setChangeModify}
                />
                :
                <BoardView
                  board = {board}
                  user = {user}
                  onClickModifyBtn={onClickModifyBtn}
                />
            }
            </DivStyle>
          </Card>
        </div>
      </Col>
    );
};

export default RightBoardTable;