import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container className='mt-5'>
            <Row className='justify-content-md-center'>
                <Col xs={12} sm={12} md={5}>
                    { children }
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
