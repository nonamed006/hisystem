/*eslint-disable*/
import React from "react";
import {
    Button,
    Modal,
    Row,
    Col
} from "reactstrap";
import styled from "styled-components";
const SpanStyle = styled.span`
    font-size: 20px;
    cursor: pointer;
`;

class DeleteWarning extends React.Component {
    state = {
        defaultModal: false
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
        
    };

    id = this.props.id;
    deleteTarget = this.props.deleteTarget;

    reload = this.props.reload;
    setReload = this.props.setReload;


    deletePatient = () => {
        fetch(`http://localhost:8081/${this.deleteTarget}/${this.id}`, {
            method: "delete",
        }).then((res) => res.text())
            .then((res) => {
                console.log(res);
                // res에 따라 성공하면 리스트 리셋
                this.setReload(!this.reload);
                //this.getPatientList();
            });
            alert("삭제되었습니다.")
        };
    render() {  
        return (
            <>
                {/* <Header></Header> */}
                <Row>
                    <Col md="4">
{/* 
                        <i className="ni ni-fat-remove"
                            onClick={() => this.toggleModal("notificationModal")}
                        >
                        </i> */}
                        <SpanStyle onClick={() => this.toggleModal("notificationModal")}>✖</SpanStyle>
                        <Modal
                            className="modal-dialog-centered modal-danger"
                            contentClassName="bg-gradient-danger"
                            isOpen={this.state.notificationModal}
                            toggle={() => this.toggleModal("notificationModal")}
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
                                    onClick={() => this.toggleModal("notificationModal")}
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
                                        () => {
                                            this.deletePatient();
                                            this.toggleModal("notificationModal");
                                        }}>
                                    삭제
                                </Button>
                                <Button
                                    className="text-white ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("notificationModal")}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal>
                    </Col>
                </Row>
            </>
        );
    }
}

export default DeleteWarning;