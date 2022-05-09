/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import DutyRegisterModal from './DutyRegisterModal';
import DutyViewModal from './DutyViewModal';
import { Container } from "reactstrap";
import styled from 'styled-components';

const h = window.innerHeight;

const DivStyle = styled.div`
	border-radius: 10px;
	height: ${h};
	
	background-color: white;
`;

// export default class DutyCal extends React.Component {
export default function () {
	const [viewModalState, setViewModalState] = useState({ isOpen: false });
	const [registerModalState, setRegisterModalState] = useState({ isOpen: false });
	const [addDuty, setAddDuty] = useState([]);
	const [dutyList, setDutyList] = useState([]);
	const [nurseList, setNurseList] = useState([]);
	const [dateList, setDateList] = useState([]);

	const [duty, setDuty] = useState({
		no: "",
		user_no: "",
		start_date: "",
		end_date: "",
		part_no: "1",
		part_name: "",
		part_time: "",
		user_name: "",
	});

	// getDate() 하루 느린거 더해주기
	function date_add(sDate, nDays) {
		var yy = parseInt(sDate.substr(0, 4), 10);
		var mm = parseInt(sDate.substr(5, 2), 10);
		var dd = parseInt(sDate.substr(8), 10);
		
		let d = new Date(yy, mm - 1, dd + nDays);
		
		yy = d.getFullYear();
		mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
		dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
		console.log(yy)
		console.log(mm)
		console.log(dd)
		// if(mm === '01' && dd === '01'){
		// 	console.log('abcd')
		// 	mm = '12'
		// 	dd = '32'
		// }
		

		return '' + yy + '-' + mm + '-' + dd;
	}

	const [reload, setReload] = useState(true);

	useEffect(() => {
		if(reload === true){
		getDutyList();
		setReload(false);
	}
	}, [reload]);

	var getDutyList = () => {
		fetch(`http://localhost:8081/admin/duty`, {
			method: "get",
		}).then((res) => res.json())
			.then((res) => {
				setDutyList(res);
				var events = []
				for (var i = 0; i < res.length; i++) {
					if (res[i].start_date !== null) { //하루 잘리는거 보완
						res[i].end_date = date_add(res[i].end_date, 1)
						
					}

					// events[i] = {
					// 	id: res[i].no,
					// 	title: res[i].user_name + "/" + res[i].part_name,
					// 	start: res[i].start_date,
					// 	end: res[i].end_date,
					// 	color: "#01A9DB"
					// }

					if(res[i].part_name === 'day'){
						events[i] = {
							id: res[i].no,
							title: res[i].user_name + "/" + res[i].part_name,
							start: res[i].start_date,
							end: res[i].end_date,
							color: "#01A9DB"
						}
					}
					if(res[i].part_name === 'evening'){
						events[i] = {
							id: res[i].no,
							title: res[i].user_name + "/" + res[i].part_name,
							start: res[i].start_date,
							end: res[i].end_date,
							color: "#298A08"
						}
					}
					if(res[i].part_name === 'night'){
						events[i] = {
							id: res[i].no,
							title: res[i].user_name + "/" + res[i].part_name,
							start: res[i].start_date,
							end: res[i].end_date,
							color: "#886A08"
						}
					}
					if(res[i].part_name === 'off'){
						events[i] = {
							id: res[i].no,
							title: res[i].user_name + "/" + res[i].part_name,
							start: res[i].start_date,
							end: res[i].end_date,
							color: "#FA5858"
						}
					}
					if(res[i].part_name === 'vacation'){
						events[i] = {
							id: res[i].no,
							title: res[i].user_name + "/" + res[i].part_name,
							start: res[i].start_date,
							end: res[i].end_date,
							color: "#2A0A0A"
						}
					}

					
				}
				setDateList(events)
			});
		fetch(`http://localhost:8081/admin/nurse`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setNurseList(res);
				console.log(res);
			});
	};


	const handleDateClick = (arg) => { // bind with an arrow function
		setDuty(Object.assign({}, duty, { start_date: arg.dateStr, end_date: arg.dateStr }))
		setRegisterModalState({ isOpen: true })
	}

	function eventClick(arg) {
		// 문자형으로 바꾸기 및 출력시 형태맞추기 =>"2021-12-09"
		let start_year = arg.event._instance.range.start.getFullYear();
		let start_month = arg.event._instance.range.start.getMonth() + 1;
		let start_day = arg.event._instance.range.start.getDate();
		let end_year = arg.event._instance.range.end.getFullYear();
		let end_month = arg.event._instance.range.end.getMonth() + 1;
		let end_day = arg.event._instance.range.end.getDate() - 1;    //풀캘린더 날짜 잘리는현상 방지용 +1 없애기

		if (start_day < 10) { start_day = "0" + start_day }
		if (start_month < 10) { start_month = "0" + start_month }
		if (end_day < 10) { end_day = "0" + end_day }
		if (end_month < 10) { end_month = "0" + end_month }

		let start_date = start_year + "-" + start_month + "-" + start_day
		let end_date = end_year + "-" + end_month + "-" + end_day

		// 처음 달력 불러올때  name/partname  붙인거 분리작업
		const str = arg.event._def.title.split("/")
		setDuty(Object.assign({}, duty, {
			no: arg.event._def.publicId,
			user_name: str[0],
			part_name: str[1],
			start_date: start_date,
			end_date: end_date
		}))
		setViewModalState({ isOpen: true })
	}

	//모달 끄기
	function closeRegisterModal() {
		setRegisterModalState({ isOpen: false })
		setTimeout(() => {
		}, 200);
	}

	return (
		<>
		<DivStyle>
			<Container className="mt--7" fluid>
				<br/>
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					dateClick={handleDateClick}
					initialView="dayGridMonth"
					weekends={true} // 주말 표시 여부
					height={h*0.7}
					events={dateList}
					eventClick={eventClick}
				/>
				<br/>

				<DutyRegisterModal
					duty={duty}
					setDuty={setDuty}
					nurseList={nurseList}
					registerModalState={registerModalState}
					setRegisterModalState={setRegisterModalState}
					reload={reload}
					setReload={setReload}
				/>

				<DutyViewModal
					viewModalState={viewModalState}
					setViewModalState={setViewModalState}
					duty={duty}
					setDuty={setDuty}
					reload={reload}
					setReload={setReload}
				/>
				
				
			</Container>
			</DivStyle>
		</>
	)
}