/*eslint-disable*/
import { Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://github.com/douzone-history/hisystem"
              target="_blank"
            >
              Douzone HIStory
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
