import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Progress = ({ step2, step3, step4 }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Container className='mt-5'>
            <Row>
                <Col sm={{ offset: 3 }}>
                    <Row className='text-center'>
                        <Col sm={2}>
                            { userInfo ? 
                                <i className="fas fa-check-circle fa-lg" style={{ color: '#198754' }}></i> 
                            :
                                <i className="far fa-check-circle fa-lg" style={{ color: '#198754' }}></i> 
                            }
                            <br></br>
                            Sign In
                        </Col>
                        <Col sm={2}>
                            { step2 ? 
                                <i className="fas fa-check-circle fa-lg" style={{ color: '#198754' }}></i>
                            :
                                <i className="far fa-check-circle fa-lg" style={{ color: '#198754' }}></i>
                            }
                            <br></br>
                            Delivery
                        </Col>
                        <Col sm={2}>
                            { step3 ? 
                                <i className="fas fa-check-circle fa-lg" style={{ color: '#198754' }}></i>
                            :
                                <i className="far fa-check-circle fa-lg" style={{ color: '#198754' }}></i>
                            }
                            <br></br>
                            Payment
                        </Col>
                        <Col sm={2}>
                            { step4 ? 
                                <i className="fas fa-check-circle fa-lg" style={{ color: '#198754' }}></i>
                            :
                                <i className="far fa-check-circle fa-lg" style={{ color: '#198754' }}></i>
                            }
                            <br></br>
                            Review Order
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Progress
