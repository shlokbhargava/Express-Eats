import React, { useState } from 'react'
import { Button, Col, Container, Form, FormControl, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import axios from 'axios'

const SearchScreen = ({ history }) => {

    const [keyword, setKeyword] = useState()
    const [location, setLocation] = useState()

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    const getLocation = () => {
        const showPosition = async (position) => {
            const loc = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=`)
            
            console.log(loc)

            // setLocation(loc)
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            setLocation("Geolocation is not supported by this browser.")
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
                            <InputGroup.Text>
                                <OverlayTrigger key='top' placement='top'
                                        overlay={
                                            <Tooltip id='tooltip-top'>
                                                Detect location
                                            </Tooltip>
                                        }
                                        >
                                        <i type='button' className="fas fa-map-marker-alt" onClick={() => getLocation()}></i>
                                </OverlayTrigger>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>
                    { location && <p>{location}</p> }
                </Col> 
            </Row>
            <br></br>
            <br></br>
        </Container>
    )
}

export default SearchScreen
