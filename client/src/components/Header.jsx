import React from 'react';
import { useDispatch, useSelector } from 'react-redux' 
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";
import SearchBox from './SearchBox'
import {logout} from '../redux/actions/userActions.js'

const Header = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)

    const logoutHandler = () => {
        dispatch(logout())
    }
    

    return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to="/">EShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox/>

                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/cart">
                            <i className="fas fa-shopping-cart" >Cart</i>
                        </Nav.Link>

                        {
                        userInfo ? 
                        (
                            <NavDropdown title={userInfo.name} id='username'>
                                
                                <NavDropdown.Item as={Link} to="/profile">
                                    Profile
                                </NavDropdown.Item>
                                

                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>

                            </NavDropdown>
                        ) 
                        : 
                        (
                            <Nav.Link as={Link} to="/login">
                                <i className="fas fa-user" >Sign In</i>
                            </Nav.Link>
                        )
                        }

                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
}

export default Header;
