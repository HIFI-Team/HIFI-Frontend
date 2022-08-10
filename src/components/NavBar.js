import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar key="md" bg="light" expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand
            onClick={e => {
              navigate('/');
            }}
          >
            <b>HIFI</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${'md'}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'md'}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link> */}
                <NavDropdown
                  title="메뉴"
                  id={`offcanvasNavbarDropdown-expand-${'md'}`}
                >
                  <NavDropdown.Item
                    onClick={e => {
                      navigate('/login');
                    }}
                  >
                    로그인
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={e => {
                      navigate('/join');
                    }}
                  >
                    회원가입
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    무엇을 적을까요
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="검색"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      )
    </>
  );
}

export default NavBar;
