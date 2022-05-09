import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width:170px;
    padding: 3px;
    margin: 3px;
    border: none;
`;
const DivStyle = styled.div`
    width : 250px;  
    padding-left : 10px;
    margin-top: 5px;
    border-bottom: 2px solid #3b5bdb;
    //border-radius: 10px;
`

const InputBox = (props) => {
    const { placeholder, type, value, onChange, onKeyUp } = props;
    
    return (
        <DivStyle>
            <i className="fas fa-search" />
            <Input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onKeyUp={onKeyUp}
            />
        </DivStyle>
    );
};

export default InputBox;