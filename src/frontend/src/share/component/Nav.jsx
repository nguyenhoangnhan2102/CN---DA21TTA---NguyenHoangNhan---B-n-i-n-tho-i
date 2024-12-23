import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import '../style.scss';
import { MdOutlineSmartphone } from "react-icons/md";

const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="navbar-container">
                <Container fluid>
                    <Navbar className='navbar-logo'>
                        <Link to={`/`} className="d-flex align-items-center text-decoration-none fst-italic" style={{ fontSize: "25px", fontWeight: 'bold', color: 'black' }}>
                            {/* <i class="fa-solid fa-phone me-2" style={{ fontSize: "25px" }}></i> */}
                            <MdOutlineSmartphone style={{ fontSize: "50px" }} />
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
                            <Link to={`/cart`} className="text-decoration-none text-dark">
                                <i
                                    class="fa-solid fa-cart-shopping me-4 d-flex align-items-center"
                                    style={{ fontSize: "25px", cursor: 'pointer' }}>
                                </i>
                            </Link>
                            <Link to={`/login`} className="text-decoration-none btn-login d-flex align-items-center me-2">
                                Đăng nhập
                            </Link>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    );
}
export default Header;