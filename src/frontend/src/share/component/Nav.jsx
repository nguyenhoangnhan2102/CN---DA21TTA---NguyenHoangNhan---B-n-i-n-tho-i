import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import '../style.scss';
import { MdOutlineSmartphone } from "react-icons/md";

const Header = () => {
    return (
        <Navbar expand="lg" className="navbar-container shadow-sm py-2" bg="light">
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand>
                    <Link
                        to={`/`}
                        className="d-flex align-items-center text-decoration-none"
                        style={{ fontSize: "25px", fontWeight: 'bold', color: 'black' }}
                    >
                        <MdOutlineSmartphone className="me-2" style={{ fontSize: "35px" }} />
                        <span className="d-none d-md-block">SHOPPHONE</span>
                    </Link>
                </Navbar.Brand>

                {/* Toggler */}
                <Navbar.Toggle aria-controls="navbarScroll" />

                {/* Links and Actions */}
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0"></Nav>
                    <Form className="d-flex align-items-center">
                        {/* Cart Icon */}
                        <Link to={`/cart`} className="text-decoration-none text-dark me-3">
                            <i
                                className="fa-solid fa-cart-shopping"
                                style={{ fontSize: "20px", cursor: 'pointer' }}
                            ></i>
                            <span className="badge bg-danger rounded-pill ms-1">3</span>
                        </Link>

                        {/* Login Button */}
                        <Link
                            to={`/profile`}
                            className="btn btn-outline-primary btn-sm text-decoration-none px-3 py-1"
                        >
                            Đăng nhập
                        </Link>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
