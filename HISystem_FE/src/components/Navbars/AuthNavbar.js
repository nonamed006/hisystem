/*eslint-disable*/
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
} from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">

          {/* 로고 */}
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={
                require("../../assets/img/brand/HISystemLogo2.PNG").default
              }
            />
          </NavbarBrand>
          
          {/* 화면 없는데 안 넣으면 오류 */}
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>

          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            {/* ? */}
            {/* <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/brand/argon-react.png")
                          .default
                      }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div> */}

            {/* 우측 상단 */}
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <NavLink className="nav-link-icon" to="/admin/receipt" tag={Link}>
                  <i className="ni ni-tv-2" />
                  <span className="nav-link-inner--text">[개발용]메인화면</span>
                </NavLink>
              </NavItem> */}

              {/* <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span className="nav-link-inner--text">Profile</span>
                </NavLink>
              </NavItem> */}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
