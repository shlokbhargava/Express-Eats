import React from 'react'
import { useSelector } from 'react-redux'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Restaurant = ({ restaurant }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const getTime = (time) => {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { 
            time = time.slice (1); 
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
            time[0] = +time[0] % 12 || 12; 
        }
        return time.join ('');
    }

    return (
        <Container className='py-5'>
            <Row className='mb-5'>
                <Col sm={12} className='note note-light'>
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
                        <strong>Open till :</strong> {getTime(restaurant.time)}
                        { userInfo && userInfo.isSeller ?
                            <Link to='/restaurant/edit'>
                                <i className="far fa-edit fa-lg float-end text-dark"></i> 
                            </Link>
                        :
                            ""
                        }
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Restaurant
