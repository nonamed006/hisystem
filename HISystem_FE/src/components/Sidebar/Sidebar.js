/*eslint-disable*/
import { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import ChatRoomModal from "components/modal/public/ChatRoomModal";
import styled from "styled-components";

var ps;

const D = styled.div`
background-color: #fff9db;
border-radius: 5px;
`;

const LogoStyle = styled.img`
  margin: 10px 0px 0px 0px;
  width: 190px;
  height: 65px
`;

const Sidebar = (props) => {
  const [user, setUser] = useState({});
  const [isFirst, setIsFirst] = useState(true);

  //const [conn, setConn] = useState({});

  // var socketConn = () => {
  //   var sockJs = new SockJS('http://localhost:8081/stomp/connect');
  //   var stomp = Stomp.over(sockJs);

  //   // 2. connection이 맺어지면 실행
  //   stomp.connect({}, function () {
  //     console.log('### STOMP Connection ###');

  //     stomp.subscribe(`/sub/chat/room/1`, function (chat) {
  //       var content = JSON.parse(chat.body);
  //       //console.log('###   subscribe   ###', content);
  //       //setReload(!reload);
  //       //alert(1);
  //       getMessageFromDB(nowChatRoomNo);
  //     });
  //   });
  //   return stomp;
  // }

  useEffect(() => {
    //fetch that brings loginid 
    fetch("http://localhost:8081/user", {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("Authorization")
      }
    }).then((res) => res.json())
      .then((res) => {
        console.log('##########################################################');
        setUser(res);
        // setConn({
        //   stomp: socketConn()
        // });
      });
  }, []);


  var roleIntToRoleString = (roleInt) => {
    if (roleInt == 1) return '원무과'
    if (roleInt == 2) return '간호사'
    if (roleInt == 3) return '수간호사'
    if (roleInt == 4) return '의사'
    if (roleInt == 9) return '관리자'
    if (roleInt == 999) return 'ADMIN'
  }

  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      // sidebar에 표시 하는 것만 등록
      if (prop.useYn != false && prop.role?.includes(user.role)) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };

  const { bgColor, routes, logo } = props;

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Brand / admin.js에서 넣어줌 */}
        {/* {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null} */}
        <LogoStyle src={`${process.env.PUBLIC_URL}/img/HISystemLogo2.PNG`} ></LogoStyle>

        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/theme/team-1-800x800.jpg")
                        .default
                    }
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>





        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>

          {/* 여기 아래 주석 두개 뭔지 모르겠음. Pro Version에서 사용하는건가 */}

          {/* Collapse header */}
          {/* <div className="navbar-collapse-header d-md-none">
          <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
            
          </div> */}
          {/* Form */}
          {/* <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form> */}

          {/* 아래는 완료 */}
          {/* 아래는 완료 */}
          {/* 아래는 완료 */}

          {/* Heading / 유저에 따라 관리자/의사/간호사/원무과 */}
          <h6 className="navbar-heading text-muted">{roleIntToRoleString(user.role)}</h6>
          {/* Navigation / 좌측 navbar 상단 부분 / props에서 가져온 routes를 가지고 좌측 navbar 상단 만들어줌 */}
          <Nav navbar>{createLinks(routes)}</Nav>

          {/* Divider / 선 */}
          {/* <hr className="my-3" /> */}

          {/* Heading / component 참고 문서 */}
          {/* <h6 className="navbar-heading text-muted">참고문서 (프로젝트 완성시 삭제)</h6> */}
          {/* Navigation */}
          {/* <Nav className="mb-md-3" navbar>

            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav> */}

          {/* 좌측 navbar 하단 채팅 */}
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="#">
                <i className="ni ni-chat-round" />

                { user == {} ? null : <ChatRoomModal setIsFirst={setIsFirst} isFirst={isFirst} user={user}></ChatRoomModal>}
              </NavLink>
            </NavItem>
          </Nav>

        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
