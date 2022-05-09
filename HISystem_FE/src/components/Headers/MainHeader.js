// reactstrap components
import { Container } from "reactstrap";
import styled from "styled-components";

const h = window.innerHeight * 0.25;
const DivStyle = styled.div`
  height : ${h}px;
  /background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%) !important; 
  /background: linear-gradient(87deg, #2dce89 0, #2dcecc 100%) !important; 
  /background: linear-gradient(87deg, #11cdef 0, #1171ef 100%) !important; 
  /background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important; 
  /background: linear-gradient(87deg, #f5365c 0, #f56036 100%) !important; 
  /background: linear-gradient(87deg, #adb5bd 0, #adaebd 100%) !important; 
  /background: linear-gradient(87deg, #172b4d 0, #1a174d 100%) !important; 
  background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%) !important; 
  /background: linear-gradient(87deg, #5603ad 0, #9d03ad 100%) !important; 
  /background: linear-gradient(87deg, #8965e0 0, #bc65e0 100%) !important; 
  /background: linear-gradient(87deg, #f3a4b5 0, #f3b4a4 100%) !important; 
  /background: linear-gradient(87deg, #f5365c 0, #f56036 100%) !important; 
  /background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important; 
  /background: linear-gradient(87deg, #ffd600 0, #beff00 100%) !important; 
  /background: linear-gradient(87deg, #2dce89 0, #2dcecc 100%) !important; 
  background: linear-gradient(87deg, #11cdef 0, #1171ef 100%) !important; #파;
  /background: linear-gradient(87deg, #2bffc6 0, #2be0ff 100%) !important; 
  /background: linear-gradient(87deg, #8898aa 0, #888aaa 100%) !important; 
  /background: linear-gradient(87deg, #32325d 0, #44325d 100%) !important; 
  /background: linear-gradient(87deg, #ced4da 0, #cecfda 100%) !important; 
  /background: linear-gradient(87deg, #e9ecef 0, #e9eaef 100%) !important; 
`;

const MainHeader = () => {
  return (
    <>
      {/* <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"> */}
      <DivStyle>
        <Container fluid>
        </Container>
      </DivStyle>
      {/* </div> */}
    </>
  );
};

export default MainHeader;
