import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const SellerDashboard = ({ history }) => {
    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { restaurantInfo, loading, error } = restaurantDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || (userInfo && !userInfo.isSeller)) {
            history.push('/')
        }
    }, [userInfo, history])

    function timeConvert (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
      
        if (time.length > 1) { 
          time = time.slice (1)  
          time[5] = +time[0] < 12 ? ' AM' : ' PM' 
          time[0] = +time[0] % 12 || 12
        }
        return time.join ('')
      }
    return (
        <Container className='py-5'>
            { loading && <Loader /> }
            { error && <Message variant='daner'>{error}</Message> }
            <Row className='py-5 mb-5'>
                <Col md={5} className='note note-light'>
                    <h3 className='h1-thin' style={{ fontSize: '2.5rem' }}>{restaurantInfo.name}</h3>
                    <p>
                        {restaurantInfo.description} <br></br>
                        Minimum Order :  ₹{restaurantInfo.minOrderValue} <br></br>
                        <Badge className='success-badge'>{ restaurantInfo.cod && 'Cash on delivery'}</Badge> &nbsp;
                        <Badge className='success-badge'>{ restaurantInfo.onlinePayment && 'Online Payment' }</Badge>
                    </p>
                    <p>
                        Deliver in : {restaurantInfo.state}, {restaurantInfo.country} <br></br>
                        Call us : +91-{restaurantInfo.contact} <br></br>
                        Open till : {timeConvert(restaurantInfo.time)}
                    </p>
                </Col>
                <Col md={6}>
                    {/* <Image src='/images/food-delivery.png' alt='Express Eats' fluid /> */}
                </Col>
            </Row>
        </Container>
    )
}

export default SellerDashboard
