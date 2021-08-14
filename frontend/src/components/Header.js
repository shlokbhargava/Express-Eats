import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar className='navbar navbar-expand-lg navbar-dark bg-dark py-3'>
            <Container>
                <Navbar.Brand href="/" style={{color: 'black', fontSize: '1.85rem', fontFamily: 'Andada Pro'}}>
                    Express Eats &nbsp; <i className="fas fa-utensils"></i>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Button className='btn btn-dark'>Login</Button> &nbsp;
                    <Button className='btn btn-dark'>Register</Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
