import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Fragment } from 'react/cjs/react.development';

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
import { isNonNullExpression, reduceEachLeadingCommentRange } from 'typescript';

// export default class DutyCal extends React.Component {
export default function () {
    const [registerModalState, setRegisterModalState] = useState({ isOpen: false });
    const [modifyModalState, setModifyModalState] = useState({ isOpen: false });
    // const [nurse, setNurse] = useState([]);
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


    function date_add(sDate, nDays) {
        var yy = parseInt(sDate.substr(0, 4), 10);
        var mm = parseInt(sDate.substr(5, 2), 10);
        var dd = parseInt(sDate.substr(8), 10);
     
        let d = new Date(yy, mm - 1, dd + nDays);
     
        yy = d.getFullYear();
        mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
        dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
     
        return '' + yy + '-' +  mm  + '-' + dd;
    }

    const [reload, setReload] = useState(false);
    useEffect(() => {
        getDutyList();
    }, [reload]);

    var getDutyList = () => {
        // ajax
        fetch(`http://localhost:8081/admin/duty`, {
            method: "get",
            // res에 결과가 들어옴
        }).then((res) => res.json())
            .then((res) => {
                setDutyList(res);

                var events = []
                console.log(res);

                // for (var i = 0; i < res.duty.length; i++) {
                //     // console.log(res.duty[i].part_name)
                //     events[i] = {
                //         title: res.duty[i].user_name + "/" + res.duty[i].part_name,
                //         start: res.duty[i].start_date,
                //         end: res.duty[i].end_date
                //     }
                // }

                for (var i = 0; i < res.length; i++) {
                    // console.log(res.duty[i].part_name)
                    if(res[i].start_date !== null){
                    res[i].end_date = date_add(res[i].end_date,1)
                    }
                    // console.log(res[i].end_date-res[i].start_date)
                    
                    events[i] = {
                        title: res[i].user_name + "/" + res[i].part_name,
                        start: res[i].start_date,
                        end: res[i].end_date,
                       
    
                    }
                }
                console.log(events)
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
    // 일정 등록
    const addDuty = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8081/admin/duty`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(duty)
        });

        if (!response.ok) {
            console.log(response)
            throw `${response.status} ${response.statusText}`;
        }
        console.log(response)
        setReload(!reload)

    }

    const handleDateClick = (arg) => { // bind with an arrow function
        console.log(arg)
        setRegisterModalState({ isOpen: true })
        setDuty(Object.assign({}, duty, { start_date: arg.dateStr }))
        // setDuty(Object.assign({}, duty, { end_date: arg.dateStr }))

    }

    function eventClick(arg) {
        console.log(arg.event)
        console.log(arg.event._def.title)       //이름/날짜
        console.log(arg.event._instance.range.start)
        console.log(arg.event._instance.range.end)
        setModifyModalState({isOpen : true})
        // console.log(arg.event._instanse.range)
    }

    function checkOnChange(e) {
        console.log(duty.user_no)
    }
    function registerDuty(e) {
        e.preventDefault()
        setRegisterModalState({ isOpen: false })
        addDuty(e);
    }
    //모달 끄기
    function closeRegisterModal() {

        setRegisterModalState({ isOpen: false })
        setTimeout(() => {
        }, 200);
    }
    function onChangeDutySelect (e){
        setDuty(Object.assign({}, duty, { user_no: e.target.value }))
    }
    //     const events = [{
    //         title: "a",
    //         start: "2021-12-01",
    //         end: "2021-12-03"

    //     },
    //     {
    //         title: "b",
    //         start: "2021-12-04",
    //         end: "2021-12-07"

    //     },
    // ]



    return (
        <Fragment>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
                initialView="dayGridMonth"
                weekends={true} // 주말 표시 여부
                height={800}
                events={dateList}
                eventClick={eventClick}
            />

            {/* <DutyRegisterModal
                registerModalState = {registerModalState}
                setRegisterModalState = {}
                closeRegisterModal = {closeRegisterModal}
            /> */}
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={registerModalState.isOpen}
                toggle={closeRegisterModal}
            // toggle={ () => setRegisterModalState({isOpen: false}) }
            >

                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={closeRegisterModal}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            {/* header 문구 */}
                            <div className="text-center text-muted mb-4">
                                <strong>일정 등록</strong>
                            </div>

                            <Form
                                role="form"
                                // onSubmit={handlerSubmit}
                            >
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">

                                        <select className="custom-select d-block w-100" id="root"
                                            id="name"
                                            name="name"
                                            // onChange={(e) => setDuty(Object.assign({}, duty, { user_no: e.target.value }))}
                                            onChange={onChangeDutySelect}
                                            value={duty.user_no}
                                        >
                                            {
                                                nurseList.map((nurse) =>
                                                    <option value={nurse.no}>{nurse.name}</option>
                                                )

                                            }
                    
                                        </select>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">

                                        <select className="custom-select d-block w-100" id="root"
                                            id="part"
                                            name="part"
                                            value={duty.part_no}

                                            // onChange={onChangeInputRole}
                                            onChange={(e) => setDuty(Object.assign({}, duty, { part_no: e.target.value }))}
                                        >

                                            <option value='1'>day</option>
                                            <option value='2'>evening</option>
                                            <option value='3'>night</option>
                                            <option value='4'>off</option>
                                            <option value='5'>vacation</option>

                                        </select>
                                        {/* // autoComplete="new-id" */}
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <label for="start">Start date:</label>

                                    <input type="date" id="start" name="duty-start"
                                        // value={date.start_date}
                                        value={duty.start_date}
                                        // onChange={(e) => setDate(Object.assign({}, date, { startDate: e.target.value }))}
                                        onChange={(e) => setDuty(Object.assign({}, duty, { start_date: e.target.value }))}

                                    />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <label for="end">End date:</label>

                                    <input type="date" id="end" name="duty-end"
                                        // value={date.endDate}
                                        value={duty.end_date}
                                        // onChange={(e) => setDate(Object.assign({}, date, { endDate: e.target.value }))}
                                        onChange={(e) => setDuty(Object.assign({}, duty, { end_date: e.target.value }))}

                                    />
                                </FormGroup>

                                {/* 등록하기 버튼 */}
                                <div className="text-center">
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="submit"
                                        onClick={closeRegisterModal}
                                        onClick={(e)=>registerDuty(e)}
                                    > 등록하기

                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </Fragment>
    )
    // }



}