import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Col, Container, Row, Modal, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createDish, listDishes } from '../actions/dishActions'
import { DISH_CREATE_RESET } from '../constants/dishConstants'
import Dish from '../components/Dish'

const SellerDashboard = ({ history }) => {
    const dispatch = useDispatch()

    const [smShow, setSmShow] = useState(false);

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { restaurantInfo, loading, error } = restaurantDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dishCreate = useSelector((state) => state.dishCreate)
    const { loading: loadingCreate, success: successCreate, dish, error: errorCreate } = dishCreate

    const dishList = useSelector((state) => state.dishList)
    const { loading: loadingDish, error: errorDish, dishes } = dishList

    useEffect(() => {
        dispatch({ type: DISH_CREATE_RESET })
            
        if (!userInfo) {
            history.push('/login')
        }
        if (userInfo && !userInfo.isSeller) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/dish/${dish._id}/edit`)
        }
        dispatch(listDishes(restaurantInfo._id))
    }, [userInfo, history, restaurantInfo, successCreate, dispatch, dish])

    const addDishHandler = () => {
        setSmShow(true)
        dispatch(createDish(restaurantInfo._id))
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
                        Open till : {restaurantInfo.time}
                    </p>
                </Col>
                <Col md={6}>
                    {/* <Image src='/images/food-delivery.png' alt='Express Eats' fluid /> */}
                </Col>
            </Row>
            { errorCreate && <Message variant='danger'>{errorCreate}</Message> }
            { loadingCreate &&  
                <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
                    <Loader />
                </Modal>
            }
            <h4 className='float-start'>Edit, Create or delete any dish. <i className="fas fa-edit"></i></h4>
            <Button onClick={addDishHandler} className='btn-dark btn-sm float-end'>
                <i className="fas fa-plus"></i>&nbsp; Add a dish
            </Button>
            <br></br>
            <br></br>
            <Row>
                { loadingDish && <Loader /> }
                { errorDish && <Message variant='danger'>{errorDish}</Message> }
                { dishes && !loadingDish && dishes.length === 0 &&
                <Message variant='dark'>{`${restaurantInfo.name} is currently serving no dishes, come back later`}</Message> 
                }
                { dishes && dishes.map((dish) => (
                    <Col key={dish._id}>
                        <Dish dish={dish} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default SellerDashboard
