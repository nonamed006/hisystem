import React from "react";
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import routes from "routes.js";
import styled from "styled-components";
const h = window.innerHeight;
const w = window.innerWidth;
const DivStyle = styled.div`
  position: relative; 
  width: ${w}px;
  height: ${h*0.98}px;
  `;

const DivStyle2 = styled.div`
  position:absolute;
  top: 400px; 
  left: 10px;
  width: 100%;
  height: 100px;

  `;

const ImgStyle = styled.img`
  height: 100%;
  width: 100%;
`;



const Auth = (props) => {

  const history = useHistory();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        if (localStorage.getItem("Authorization") != null) {
          history.push('/admin/main');
        }
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            userName={props.userName}
            setUserName={props.setUserName}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <DivStyle>
        <ImgStyle src={`${process.env.PUBLIC_URL}/img/login.jpg` }></ImgStyle>
        {/* <img src={`${process.env.PUBLIC_URL}/img/login.jpg`} className="a" style={{ height: "120%" }}></img> */}
      </DivStyle>
      {/* ##### 아래가 로그인 form */}
      {/* ##### 아래가 로그인 form */}
      <DivStyle2>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
            </Switch>
          </Row>
        </Container>

      </DivStyle2>
      {/* ##### 로그인 form */}
      {/* ##### 로그인 form */}

      
    </>
  );
};

export default Auth;
