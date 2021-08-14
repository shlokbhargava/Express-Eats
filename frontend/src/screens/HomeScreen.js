import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'

const HomeScreen = () => {
    return (
        <Container className='py-5'>
            <Row className='py-4'>
                <Col md={6}>
                    <h1 className='h1-thin'>Safe Food</h1>
                    <h1 className='h1-bold mb-4'>DELIVERY</h1>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button className='mt-4' variant="danger">Order Now</Button>
                </Col>
                <Col md={6}>
                    <Image src='/images/food-delivery.png' alt='Express Eats' fluid />
                </Col>
            </Row>
            <Row className='py-5'>
                <p className='text-center'>Search Your Favourite food and we'll deliver <i class="fas fa-hamburger"></i></p>
            </Row>
        </Container>
    )
}

export default HomeScreen
