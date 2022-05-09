/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Board, { moveCard } from "@lourenci/react-kanban";
import "assets/css/boardstyle.css";

import {
	Button,
	Card,
	CardHeader,
	Col,
	Container,
	Row,
} from "reactstrap";
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const DivStyle1 = styled.div`
	overflow: auto;
  width : 100%;
  height : 550px;
  //border: 1px solid black;
  padding : 20px 40px 20px 40px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 5px 5px 3px #ced4da;
`;
const DivBack = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffa8a8;
  /padding-top:20px;
  border-radius:100px;
  position: relative;
`;
const DivBack2 = styled.div`
  width: 150px;
  height: 10px;
  position: absolute;
  margin: 5px;
`;
const Input = styled.input`
  width : 100%;
  padding: 5px;
  border: none;
`;
const InputBox = styled.div`
  width: 100%;
  border-bottom: 1px solid #f5365c;
`;

const KandanBoard = (props) => {
	const {test, setTest, userNo} = props;

	const [conn, setConn] = useState({});
  // const [alarmInfo, setAlarmInfo] = useState({
  //   state : false,
  //   message: ''
  // });
  var user;

  var socketConn = () => {
    var sockJs = new SockJS('http://localhost:8081/stomp/connect');
    var stomp = Stomp.over(sockJs);

    // 2. connection이 맺어지면 실행
    stomp.connect({}, function () {
      console.log('### STOMP STOMP STOMP STOMP STOMP ###');

      stomp.subscribe(`/sub/chat/room/kanbanReload`, function (chat) {
        var content = JSON.parse(chat.body); 
				if(content.no != userNo) getKanban();
      });
    });
    return stomp;
  }

  var kanbanReload = () => {
    //conn.stomp.send('/pub/chat/kanbanReload', {}, JSON.stringify({ no: userNo }));
  }
	// ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
	// ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
	// ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
	// ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
	// ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
	const [newBoard, setNewBoard] = useState(''); // 추가 할 단어
	//const [test, setTest] = useState(false);
	const [kanban, SetKanban] = useState({ columns: [] });
	const [kanban2, SetKanban2] = useState({ columns: [] });
	const [reload, setReload] = useState(false);

	// inputBox change
	const inputSearch = (e) => {
		setNewBoard(e.target.value);
	};

	useEffect(() => {
		fetch(`http://localhost:8081/kanban`, {
			method: "get",
		}).then((res) => res.json())
			.then((res) => {
				SetKanban({ columns: res });
				setTest(true);
				setConn({
          //stomp: socketConn()
        });
			});
		//getKanban();
	}, [reload]);

	// 칸반, card 조회
	var getKanban = () => {
		//setTest(!test);
		fetch(`http://localhost:8081/kanban`, {
			method: "get",
		}).then((res) => res.json())
			.then((res) => {
				if(!test) SetKanban({ columns: res });
				else SetKanban2({ columns: res });
				setTest(!test);
			});
	}

	// 칸반 board 추가 
	var addKanbanBoard = (name) => {
		if (name == '') {
			alert('Board 이름을 입력하세요');
			return;
		}

		fetch(`http://localhost:8081/user/kanban/${name}`, {
			method: "get",
			headers: { 'Authorization': localStorage.getItem("Authorization") }
		}).then((res) => res.text())
			.then((res) => {
				if (res == 'success') {
					//setReload(!reload);
					getKanban();
					kanbanReload();
				} else {
					alert(res);
				}
			});
	};

	// card 추가
	var addCard = (e) => {
		var index = getKanbanIndex(e, 1);

		let d = {
			title: e.columns[index].cards[0].title,
			description: e.columns[index].cards[0].description,
			//id: e.columns[index].cards.length - 1 == 0 ? 1 
			//	: e.columns[index].cards[e.columns[index].cards.length - 1].id + 1,
			kanban_no: e.columns[index].id
		};

		fetch("http://localhost:8081/user/kanban", {
			method: "POST",
			body: JSON.stringify(d),
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then(res => {
			if (res.text = "success") {
				//SetKanban(e);
				getKanban();
				kanbanReload();
				return "성공";
			}
			else return "실패";
		}).then(res => {
		});
	};

	// card 삭제
	var delCard = (e) => {
		console.log(e);
		var index = getKanbanIndex(e, 2);
		//console.log(getKanbanIndex(e,2));

		var idx = null;

		if(test){
			console.log(kanban);
			for(var i = 0; i < kanban.columns[index].cards.length; i ++){
				if(kanban.columns[index].cards[i].id != e.columns[index].cards[i]?.id){
					idx = kanban.columns[index].cards[i].id;
					break;
				}
			}
		}else{
			console.log(kanban2);
			for(var i = 0; i < kanban2.columns[index].cards.length; i ++){
				if(kanban2.columns[index].cards[i].id != e.columns[index].cards[i]?.id){
					idx = kanban2.columns[index].cards[i].id;
					break;
				}
			}
		}
		
		console.log(idx);

		fetch(`http://localhost:8081/user/kanban/${idx}`, {
			method: "delete",
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then(res => {
			if (res.text = "success") {
				//SetKanban(e);
				getKanban();
				kanbanReload();
				return "성공";
			}
			else return "실패";
		}).then(res => {
		});
	};


	// 추가된 kanban 찾는 함수
	var getKanbanIndex = (o, i) => {
		if(i == 1){
			for (var i = 0; i < o.columns.length; i++) {
				if(test){
					if (o.columns[i].cards.length != kanban.columns[i].cards.length) return i;
				} else{
					if (o.columns[i].cards.length != kanban2.columns[i].cards.length) return i;
				}
			}
		}
		if(i == 2){
			if(test){
				for (var i = 0; i < kanban.columns.length; i++) {
					if (o.columns[i].cards.length != kanban.columns[i].cards.length) return i;
				}
			} else{
				for (var i = 0; i < kanban2.columns.length; i++) {
					if (o.columns[i].cards.length != kanban2.columns[i].cards.length) return i;
				}
			}
		}
	}

	// 이동
	function onCardDragEnd(e) {
		console.log(e);

		var index = null; // 이동할 card id
		var targetKanban = null; // 이동할 칸반 id

		for (var i = 0; i < e.columns.length; i++) {
			if(test){
				if (e.columns[i].cards.length > kanban.columns[i].cards.length) {
					for(var j = 0; j < e.columns[i].cards.length; j++){
						if(kanban.columns[i].cards[j]?.id != e.columns[i].cards[j].id){
							index = e.columns[i].cards[j].id;
							targetKanban = kanban.columns[i].id;
							break;
						}
					}
				}
			} else{
				if (e.columns[i].cards.length > kanban2.columns[i].cards.length) {
					for(var j = 0; j < e.columns[i].cards.length; j++){
						if(kanban2.columns[i].cards[j]?.id != e.columns[i].cards[j].id){
							index = e.columns[i].cards[j].id;
							targetKanban = kanban2.columns[i].id;
							break;
						}
					}
				}
			}
		}

		console.log(index);
		console.log(targetKanban);

		fetch(`http://localhost:8081/user/kanban/${index}/${targetKanban}`, {
			method: "put",
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then(res => {
			if (res.text = "success") {
				//SetKanban(e);
				getKanban();
				kanbanReload();
				return "성공";
			}
			else return "실패";
		}).then(res => {
		});
	}

	function onCardMove(card, source, destination) {
		const updatedBoard = moveCard(board, source, destination);
		setBoard(updatedBoard);

		console.log("----------");
		console.log(card);
		console.log(source);
		console.log(destination);
		console.log(updatedBoard);
	}



	return (
		<DivStyle1>
			<Row>
				<Col xl='7'>
					<DivBack>
						<DivBack2>
							<h3>Kanban Board</h3>
						</DivBack2>
					</DivBack>
				</Col>
				<Col xl='3'>
					<InputBox>
						<Input
							placeholder='Board 이름을 입력하세요'
							onChange={inputSearch}
							value={newBoard}
						/>
					</InputBox>
				</Col>
				<Col xl='2'>
					<Button color="danger" size='sm' type="button"
						onClick={() => addKanbanBoard(newBoard)}>
						Board 추가
					</Button>
				</Col>
			</Row>
			<br />
			{test ?
				<Board
					allowRemoveLane
					allowRenameColumn={console.log}
					allowRemoveCard

					onLaneRemove={console.log}
					onLaneRename={console.log}
					onCardMove={onCardMove}

					initialBoard={kanban}

					allowAddCard={{ on: "top" }}
					onNewCardConfirm={draftCard => ({
						id: new Date().getTime(),
						...draftCard
					})}

					onCardDragEnd={onCardDragEnd}	// 이동
					onCardNew={(e) => { addCard(e); }} // 추가
					onCardRemove={(e)=>{ delCard(e); }}	// 삭제
				/>
				: <>
				<Board
					allowRemoveLane
					allowRenameColumn={console.log}
					allowRemoveCard

					onLaneRemove={console.log}
					onLaneRename={console.log}
					onCardMove={onCardMove}

					initialBoard={kanban2}

					allowAddCard={{ on: "top" }}
					onNewCardConfirm={draftCard => ({
						id: new Date().getTime(),
						...draftCard
					})}

					onCardDragEnd={onCardDragEnd} // 이동
					onCardNew={(e) => { addCard(e); }} // 추가
					onCardRemove={(e)=>{ delCard(e); }}	// 삭제
					/>
				</>
			}

		</DivStyle1>
	);
};

export default KandanBoard;