import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Col, Container, Row, Modal, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createDish, listDishes } from '../actions/dishActions'
import { DISH_CREATE_RESET } from '../constants/dishConstants'
import Dish from '../components/Dish'
import { Link } from 'react-router-dom'

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

    const dishDelete = useSelector((state) => state.dishDelete)
    const { error: errorDelete, success: successDelete } = dishDelete

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
        if (successDelete) {
            window.alert('Dish Deleted!')
        }
        dispatch(listDishes(restaurantInfo._id))
    }, [userInfo, history, restaurantInfo, successCreate, successDelete, dispatch, dish])

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
                        <strong>Minimum Order :</strong>  ₹{restaurantInfo.minOrderValue} <br></br>
                        <Badge className='success-badge'>{ restaurantInfo.cod && 'Cash on delivery'}</Badge> &nbsp;
                        <Badge className='success-badge'>{ restaurantInfo.onlinePayment && 'Online Payment' }</Badge>
                    </p>
                    <p>
                        <strong>Deliver in :</strong> {restaurantInfo.state}, {restaurantInfo.country} <br></br>
                        <strong>Call us :</strong> +91-{restaurantInfo.contact} <br></br>
                        <strong>Write us at :</strong> {restaurantInfo.email} <br></br>
                        <strong>Open till :</strong> {restaurantInfo.time}
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
            { errorCreate && <Message variant='danger'>{errorCreate}</Message> }
            { loadingCreate &&  
                <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
                    <Loader />
                </Modal>
            }
            <h4 className='float-start'>Edit, Create or delete any dish.</h4>
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
                { errorDelete && <Message variant='danger'>{errorDelete}</Message>  }
                { dishes && dishes.map((dish) => (
                    <Col className='flex' key={dish._id}>
                        <Dish dish={dish} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default SellerDashboard
