/*eslint-disable*/
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";


import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    InputGroup,
    Modal,
} from "reactstrap";
import ReactDatetime from "react-datetime";


// (() => {
//     fetch(`http://localhost:8081/patient/1/notSearch`, {
//       method: "get",
//     }).then((res) => res.json())
//       .then((res) => {
//         patientList = res;
//       });
//   })();

const DutyRegisterModal = ({ duty, setDuty, nurseList, registerModalState, setRegisterModalState, reload, setReload }) => {

    // 모달 끄기
    function closeRegisterModal() {
        setRegisterModalState({ isOpen: false })
    }
    function onChangeDutySelect(e) {
        setDuty(Object.assign({}, duty, { user_no: e.target.value }))
    }
    
    
    const[checkRegisterState,setCheckRegisterState] = useState("");
    function registerDuty(e) {
        e.preventDefault()
        console.log(e)
        console.log("adsadsadsasad")
        
        setCheckRegisterState("Y")
        // setDuty("")
        setRegisterModalState({ isOpen: false })
        addDuty(duty);

    }
    function handleStartDate(Idate) {
        let date = new Date(Idate);
        if(date.getDate() < 10){
            console.log(date.getDate())
        }
        let formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        setDuty(Object.assign({}, duty, { start_date: formatDate }))
    }
    function handleEndDate(Idate) {
        let date = new Date(Idate);
        console.log(date.getDate())
        let day = date.getDate()
        let month = date.getMonth() + 1;
        console.log(month)

        if(day<10){     //10보다작으면 0이 안들어가서 01,02 포멧 맞춰주기위함
            console.log("0"+date.getDate())
            day = "0" + day;
        }
        if(month<10){
            month = "0" + month;
        }
        let formatDate = date.getFullYear() + "-" + month + "-" + day;
        setDuty(Object.assign({}, duty, { end_date: formatDate }))

    }

    useEffect(() => {
        if(checkRegisterState=== "Y"){
            console.log("abcdabcd")
        }
      }, [checkRegisterState]);
    // 일정 등록
    const addDuty = async (duty) => {
        // e.preventDefault();

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
        alert("등록되었습니다")

    }

    return (
        <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={registerModalState.isOpen}
            toggle={closeRegisterModal}
        // toggle={ () => setRegisterModalState({isOpen: false}) }
        >

            {/* <div className="modal-header">
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={closeRegisterModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div> */}
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
                                    // value={duty.user_no}
                                    >   <option>간호사선택</option>
                                        {
                                            nurseList.map((nurse) =>
                                                <option value={nurse.no} >{nurse.name} </option>
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
                                        // value={duty.part_no}

                                        // onChange={onChangeInputRole}
                                        onChange={(e) => setDuty(Object.assign({}, duty, { part_no: e.target.value }))}
                                    >
                                        <option>파트선택</option>

                                        <option value='1'>day</option>
                                        <option value='2'>evening</option>
                                        <option value='3'>night</option>
                                        <option value='4'>off</option>
                                        <option value='5'>vacation</option>

                                    </select>
                                    {/* // autoComplete="new-id" */}
                                </InputGroup>
                            </FormGroup>

                            {/* <FormGroup className="mb-3">
                                <label for="start">Start date:</label>

                                <input type="date" id="start" name="duty-start"
                                    // value={date.start_date}
                                    value={duty.start_date}
                                    // onChange={(e) => setDate(Object.assign({}, date, { startDate: e.target.value }))}
                                    onChange={(e) => setDuty(Object.assign({}, duty, { start_date: e.target.value }))}

                                />
                            </FormGroup> */}

                            {/* <FormGroup className="mb-3">
                                <label for="end">End date:</label>

                                <input type="date" id="end" name="duty-end"
                                    // value={date.endDate}
                                    value={duty.end_date}
                                    // onChange={(e) => setDate(Object.assign({}, date, { endDate: e.target.value }))}
                                    onChange={(e) => setDuty(Object.assign({}, duty, { end_date: e.target.value }))}

                                />
                            </FormGroup> */}
                            {/* 달력 start_date */}
                            <strong>Start Date</strong>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    
                                    <ReactDatetime
                                        //   onChange={(e) => this.handleDate(e)}
                                        onChange={(e) => handleStartDate(e)}
                                        value={duty.start_date}
                                        // onChange={(e) => setDuty(Object.assign({}, duty, { end_date: e.target.value }))}


                                        inputProps={{
                                            placeholder: "Start Date"
                                        }}
                                        dateFormat="YYYY-MM-DD"
                                    //   timeFormat="HH:mm"
                                    // timeFormat={false}
                                    />

                                </InputGroup>
                            </FormGroup>
                            <strong>End Date</strong>
                            {/* 달력 end_date */}
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <ReactDatetime
                                        //   onChange={(e) => this.handleDate(e)}
                                        onChange={(e) => handleEndDate(e)}
                                        value={duty.end_date}
                                        // onChange={(e) => setDuty(Object.assign({}, duty, { end_date: e.target.value }))}
                                        inputProps={{
                                            placeholder: "End Date"
                                        }}
                                        dateFormat="YYYY-MM-DD"
                                    //   timeFormat="HH:mm"
                                    // timeFormat={false}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {/* 등록하기 버튼 */}
                            <div className="text-center">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="submit"
                                    // onClick={closeRegisterModal}
                                    onClick={(e) => registerDuty(e)}
                                > 등록하기

                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Modal>
    );
};

export default DutyRegisterModal;