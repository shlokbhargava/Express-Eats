import React from 'react'
import { useSelector } from 'react-redux'
import { Badge, Col, Container, Row } from 'react-bootstrap'

const Restaurant = ({ restaurant, history }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const onClickHandler = () => {
        history.push('/restaurant/edit')
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
                        <strong>Open till :</strong> {restaurant.time}
                        { userInfo && userInfo.isSeller ?
                            <i role='button' className="far fa-edit fa-lg float-end text-dark" onClick={onClickHandler}></i> 
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
