import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Row
} from "reactstrap";

class Datepicker extends React.Component {
    state = {};
    handleDate(date){
        this.setState({date});
     };

    render() {
        return (
            <>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        {/* 아이콘 */}
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                        </InputGroupAddon>
                        {/* 달력 input */}
                        <ReactDatetime 
                            onChange={this.props.handleDate}
                            inputProps={{
                                placeholder: "Date Picker Here"
                            }}
                            timeFormat={false}
                        />
                    </InputGroup>
                </FormGroup>
            </>
        );
    }
}

export default Datepicker;