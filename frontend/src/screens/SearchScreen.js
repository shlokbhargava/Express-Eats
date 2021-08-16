import React from 'react'
import { Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

const SearchScreen = () => {
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={12} md={8}>
                    <InputGroup className="mb-2">
                        <FormControl placeholder="Search Restaurant" />
                        <InputGroup.Text><i type='button' className="fas fa-search"></i></InputGroup.Text>
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
                </Col> 
            </Row>
        </Container>
    )
}

export default SearchScreen
