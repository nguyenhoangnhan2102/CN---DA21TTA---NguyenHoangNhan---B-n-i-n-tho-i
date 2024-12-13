import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import '../style.scss';

const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="navbar-container">
                <Container fluid>
                    <Navbar className='navbar-logo'>
                        <Link to={`/`} className="text-decoration-none fst-italic" style={{ fontSize: "25px", fontWeight: 'bold', color: 'black' }}>
                            <i class="fa-solid fa-phone me-2" style={{ fontSize: "25px" }}></i>
                            SHOPPHONE
                        </Link>
                    </Navbar>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex">
                            <i
                                class="fa-solid fa-cart-shopping me-4 d-flex align-items-center"
                                style={{ fontSize: "25px", cursor: 'pointer' }}>
                            </i>
                            <Button className="btn-login d-flex align-items-center">
                                Đăng nhập
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    );
}
export default Header;