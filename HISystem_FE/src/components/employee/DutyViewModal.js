/*eslint-disable*/
import React from 'react';
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    InputGroup,
    Modal,
    Row
} from "reactstrap";
import Duty from 'views/page/Duty';
import ReactDatetime from "react-datetime";

const DutyViewModal = ({ viewModalState, setViewModalState, duty, setDuty, reload, setReload }) => {

    // 모달 끄기
    function closeViewModal() {
        setViewModalState({ isOpen: false })
        console.log("끄기")

    }

    function onClickModify(e) {
        e.preventDefault()
        setViewModalState({ isOpen: false })
        console.log("수정")
        updateDuty(e);
    }

    function onClickDelete(e) {
        e.preventDefault()
        setViewModalState({ isOpen: false })
        console.log("삭제")
        deleteDuty(e);

    }

    const updateDuty = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8081/admin/duty/update`, {
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

    const deleteDuty = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8081/admin/duty/delete`, {
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
        alert("삭제되었습니다.")


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


    return (
        <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={viewModalState.isOpen}
            toggle={closeViewModal}
        // toggle={ () => setViewModalState({isOpen: false}) }
        >

            <div className="modal-header">
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={closeViewModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        {/* header 문구 */}
                        <div className="text-center text-muted mb-4">
                            <strong>일정 수정하기</strong>
                        </div>

                        <Form
                            role="form"
                        // onSubmit={handlerSubmit}
                        >
                            <strong>Name</strong>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <span>{duty.user_name}</span>

                                </InputGroup>
                            </FormGroup>
                            
                            <strong>duty</strong>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <span>{duty.part_name}</span>

                                    {/* // autoComplete="new-id" */}
                                </InputGroup>
                            </FormGroup>


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

                            {/* 수정하기 버튼 */}
                            <div className="modal-footer">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    // type="submit"
                                    onClick={(e) => onClickModify(e)}

                                > 수정하기

                                </Button>
                                {/* 수정하기 버튼 */}
                                <Button
                                    className="my-4"
                                    color="primary"
                                    // type="submit"
                                    onClick={(e) => onClickDelete(e)}

                                > 삭제하기

                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Modal>
    );
};

export default DutyViewModal;