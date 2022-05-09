import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
 
const AdminNavbar = (props) => {

  var logout = (e) => {
    //e.preventDefault();
    localStorage.removeItem("Authorization");

    // logout fetch 
    fetch(`http://localhost:8081/logout`, {
      method: "GET",
      headers: {
      }
    }).then(res => res.text())
      .then(res => {
        //alert(res);
      });
  }

  const [user, setUser] = useState({});

  useEffect(() => {
    //fetch that brings loginid 
    fetch("http://localhost:8081/user", {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("Authorization")
      }
    }).then((res) => res.json())
      .then((res) => {
        setUser(res);
      });
  }, []);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          {/* 좌측 상단 페이지 이름(routes.js에서 가져옴) */}
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/#"
          >
            {props.brandText}
          </Link>
          
          {/* 우측 상단 검색 */}
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}


          <Nav className="align-items-center d-none d-md-flex" navbar>

            <UncontrolledDropdown nav>
              {/* 우측 상단 유저 */}
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* 유저 프로필 사진 */}
                    {   user.role == '4' && user.gender == 'M' ? 
                        <img alt="..." src="https://previews.123rf.com/images/tmricons/tmricons1510/tmricons151000356/45811636-%EC%9D%98%EC%82%AC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg?fj=1"/>
                      : user.role == '4' && user.gender == 'F' ? 
                        <img alt="..." src="https://previews.123rf.com/images/tuktukdesign/tuktukdesign1609/tuktukdesign160900043/65804607-la-mujer-del-doctor-icono-m%C3%A9dico-medicina-salud-ilustraci%C3%B3n-vectorial-glifo-md.jpg?fj=1"/>
                      : user.gender == 'F' ? 
                        <img alt="..." src="https://previews.123rf.com/images/foxroar/foxroar1604/foxroar160400061/54505495-l%C3%ADnea-de-icono-de-enfermera-visten-el-estilo-antiguo.jpg?fj=1"/>
                      : <img alt="..." src="https://media.istockphoto.com/vectors/male-nurse-icon-vector-id1225317073"/>
                    }
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>

                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem> */}

                <DropdownItem to="/admin/user-profile" tag={Link} to='/admin/duty'>
                  <i className="ni ni-calendar-grid-58" />
                  <span>근무표</span>
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem href="#pablo" tag={Link} to='/auth/login' onClick={(e) => logout(e)} >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>

            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
