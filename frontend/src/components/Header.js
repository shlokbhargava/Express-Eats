import React from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
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
                    <Link to='/register'><Button className='btn btn-dark'>Register</Button></Link> &nbsp;&nbsp;
                    <Link to='/cart'>
                        <Button className='btn btn-dark'>
                            <i className="fas fa-shopping-cart"></i>
                            {/* <Badge variant="dark">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge> */}
                        </Button> 
                    </Link>
                </Nav>
                {/* <Link to=''></Link> */}
            </Container>
        </Navbar>
    )
}

export default Header
