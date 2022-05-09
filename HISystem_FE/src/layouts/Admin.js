import React from "react";
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import styled from "styled-components";

const h = window.innerHeight * 0.87;
const DivStyle = styled.div`
  height: ${h}px;
`;

const Admin = (props) => {

  const history = useHistory();

  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    let isLogin = localStorage.getItem("Authorization");
    if (isLogin == null || isLogin == undefined || isLogin == '') {
      //alert('aa');
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {

        if (localStorage.getItem("Authorization") == null) {
          history.push('/auth/login');
        }

        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          // userName={props.userName}
          // setUserName={props.setUserName}
          />
          //<Route path="/auth" render={(props) => <AuthLayout {...props} userName={userName} setUserName={setUserName}/>} />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/main",
          imgSrc: require("../assets/img/brand/HISystemLogo2.PNG").default,
          imgAlt: "...",
        }}
      />

      <div className="main-content" ref={mainContent}>
        {/* <DivStyle> */}
          {/* routes에서 넣어준 path name으로 좌측 상단 페이지 이름 넣어줌 */}
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
          />

          {/* 경로 */}
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/main" />
          </Switch>
        {/* </DivStyle> */}
        {/* header는 각각의 page 상단에 넣어야 하는데 fotter는 다 들어감 */}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
