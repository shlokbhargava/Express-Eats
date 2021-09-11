import React from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Restaurant = ({ restaurant }) => {
    return (
        <Container className='py-5'>
            <Row className='py-5 mb-5'>
                <Col md={5} className='note note-light'>
                    <h3 className='h1-thin' style={{ fontSize: '2.5rem' }}>{restaurant.name}</h3>
                    <p>
                        {restaurant.description} <br></br>
                        <strong>Minimum Order :</strong>  ₹{restaurant.minOrderValue} <br></br>
                        <Badge className='success-badge'>{ restaurant.cod && 'Cash on delivery'}</Badge> &nbsp;
                        <Badge className='success-badge'>{ restaurant.onlinePayment && 'Online Payment' }</Badge>
                    </p>
                    <p>
                        <strong>Deliver in :</strong> {restaurant.state}, {restaurant.country} <br></br>
                        <strong>Call us :</strong> +91-{restaurant.contact} <br></br>
                        <strong>Write us at :</strong> {restaurant.email} <br></br>
                        <strong>Open till :</strong> {restaurant.time}
                        <Link to='/restaurant/edit'>
                            <i className="far fa-edit fa-lg float-end text-dark"></i> 
                        </Link>
                    </p>
                </Col>
                <Col md={7}>
                    <h1><Badge variant='warning'>Current Orders</Badge></h1>
                    {/* <Image src='/images/food-delivery.png' alt='Express Eats' fluid /> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Restaurant
