import React, { useState } from 'react'
import { Button, Col, Container, Form, FormControl, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

const SearchScreen = ({ history }) => {

    const [keyword, setKeyword] = useState()

    console.log(keyword)

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={12} md={8}>
                    <Form onSubmit={submitHandler}>
                        <InputGroup className="mb-2">
                            <FormControl type='text' name='q' placeholder="Search for restaurants" onChange={(e) => setKeyword(e.target.value)} />
                            <Button variant='secondary' type="submit">Search</Button>
                            <InputGroup.Text>
                                <OverlayTrigger key='top' placement='top'
                                        overlay={
                                            <Tooltip id='tooltip-top'>
                                                Detect location
                                            </Tooltip>
                                        }
                                        >
                                        <i type='button' className="fas fa-map-marker-alt"></i>
                                </OverlayTrigger>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>
                </Col> 
            </Row>
            <br></br>
            <br></br>
        </Container>
    )
}

export default SearchScreen
