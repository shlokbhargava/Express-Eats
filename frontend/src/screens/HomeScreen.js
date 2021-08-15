import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import SearchScreen from './SearchScreen'

const HomeScreen = () => {
    return (
        <Container className='py-5'>
            <Row className='py-4'>
                <Col md={6}>
                    <h1 className='h1-thin'>Safe Food</h1>
                    <h1 className='h1-bold mb-4'>DELIVERY</h1>
                    <p>If your application contains a large number of form groups, we recommend building a higher-level component encapsulating a complete field group that renders the label, the control, and any other necessary components. We don't provide this out-of-the-box, because the composition of those field groups is too specific to an individual application to admit a good one-size-fits-all solution.</p>
                    <Button className='btn mt-4' variant="danger">Order Now</Button>
                </Col>
                <Col md={6}>
                    <Image src='/images/food-delivery.png' alt='Express Eats' fluid />
                </Col>
            </Row>
            <Row className='py-5'>
                <p className='text-center'>Search your nearest restaurant <i className="fas fa-store-alt"></i></p>
            </Row>
            <SearchScreen />
        </Container>
    )
}

export default HomeScreen
