import React, { useState } from 'react'
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'

const SearchScreen = ({ history }) => {

    const [keyword, setKeyword] = useState()

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
                            <FormControl type='text' name='q' placeholder="Search for state, restaurants or dish" onChange={(e) => setKeyword(e.target.value)} />
                            <Button variant='secondary' type="submit">Search</Button>
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
