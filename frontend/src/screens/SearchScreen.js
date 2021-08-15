import React from 'react'
import { Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'

const SearchScreen = () => {
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={12} md={8}>
                    <InputGroup className="mb-2">
                        <FormControl placeholder="Search Restaurant" />
                        <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup>
                </Col> 
            </Row>
        </Container>
    )
}

export default SearchScreen
