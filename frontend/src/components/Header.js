import React from 'react'
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar className='navbar navbar-expand-lg navbar-dark bg-dark py-3'>
            <Container>
                <Navbar.Brand href="/" style={{color: 'black', fontSize: '1.85rem', fontFamily: 'Andada Pro'}}>
                    Express Eats &nbsp; <i className="fas fa-utensils"></i>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    { userInfo ? 
                    <>
                        <DropdownButton variant='dark' title={userInfo.name}>
                            <Dropdown.Item href="/profile"><i className="fas fa-user-circle"></i> Profile</Dropdown.Item>
                            {userInfo && !userInfo.isSeller &&
                                <Dropdown.Item href="/">
                                    <i className="fas fa-box-open"></i> Orders
                                </Dropdown.Item>
                            }   
                            <Dropdown.Item onClick={() => logoutHandler()}><i className="fas fa-sign-out-alt"></i> Logout</Dropdown.Item>
                        </DropdownButton>  &nbsp;&nbsp;
                    </>
                    : 
                    <>
                        <Link to='/login'><Button className='btn btn-dark'>Login</Button></Link> &nbsp;&nbsp;
                        <Link to='/register'><Button className='btn btn-dark'>Register</Button></Link> &nbsp;&nbsp;
                    </>
                    }

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
