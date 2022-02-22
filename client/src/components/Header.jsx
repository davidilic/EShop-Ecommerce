import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Header = () => (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to="/">EShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/cart">
                            <i className="fas fa-shopping-cart" >Cart</i>
                        </Nav.Link>

                        <Nav.Link as={Link} to="/login">
                            <i className="fas fa-user" >Login</i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
)

export default Header;
