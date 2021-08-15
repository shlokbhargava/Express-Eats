import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar className='navbar navbar-expand-lg navbar-dark bg-dark py-3'>
            <Container>
                <Navbar.Brand href="/" style={{color: 'black', fontSize: '1.85rem', fontFamily: 'Andada Pro'}}>
                    Express Eats &nbsp; <i className="fas fa-utensils"></i>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Link to='/login'><Button className='btn btn-dark'>Login</Button></Link> &nbsp;&nbsp;
                    <Link to='/register'><Button className='btn btn-dark'>Register</Button></Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
