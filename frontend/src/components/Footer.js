import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Footer = () => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Container className='mt-5 footer py-5' fluid>
            <Container>
                <Row>
                    <Col className='text-center py-2' md={4}>
                        <h3>Express Eats for Business</h3>
                        <p>Become Express Seller. Grow your business in India. Register for free. Start delighting your customers with lucious food.</p>
                        { !userInfo && 
                            <Link to='/seller/register'>
                                <Button className='btn btn-dark'>Get Started</Button>
                            </Link>
                        }
                    </Col>
                    <Col className='text-center py-2' md={{ span: 4, offset: 4 }}>
                        <h3>Reach Us At</h3>
                        <ul style={{ listStyle: 'none' }}>
                            <li>
                                <i className="fas fa-envelope"></i> &nbsp;
                                <a style={{ textDecoration: 'none', color: 'black'}} href="mailto:support@expresseats.com">support@expresseats.com</a>
                            </li>
                            <li>
                            <i className="fas fa-phone-alt"></i> &nbsp;
                            +91 5982597287&emsp;&emsp;&emsp;&emsp;&nbsp;       
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center py-1'>
                        Copyright &copy; Express Eats
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Footer
