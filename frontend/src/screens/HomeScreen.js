import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { listRestaurants } from '../actions/restaurantActions'
import SearchScreen from './SearchScreen'
import Loader from '../components/Loader'
import { listAllDishes } from '../actions/dishActions'

const HomeScreen = ({ match, history }) => {
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const getStringPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
    } 

    const restaurantList = useSelector((state) => state.restaurantList)
    const { loading, restaurants } = restaurantList

    const dishesList = useSelector((state) => state.dishesList)
    const { dishes } = dishesList

    useEffect(() => {
        if (keyword) {
            dispatch(listRestaurants(keyword))
            dispatch(listAllDishes(keyword))
        }
    }, [dispatch, keyword])

    return (
        <Container className='py-5'>
            <Row className='py-5 mb-5'>
                <Col md={6}>
                    <h1 className='h1-thin'>Safe Food</h1>
                    <h1 className='h1-bold mb-4'>DELIVERY</h1>
                    <p>If your application contains a large number of form groups, we recommend building a higher-level component encapsulating a complete field group that renders the label, the control, and any other necessary components. We don't provide this out-of-the-box, because the composition of those field groups is too specific to an individual application to admit a good one-size-fits-all solution.</p>
                    <Link to='/login'><Button className='btn mt-4' variant="outline-danger">Order Now</Button></Link>
                </Col>
                <Col md={6}>
                    <Image src='/images/food-delivery.png' alt='Express Eats' fluid />
                </Col>
            </Row>
            <Row className='py-3'>
                <p className='text-center'>Search your state, restaurant or dish <i className="fas fa-store-alt"></i></p>
            </Row>
            <Route render={({ history }) => <SearchScreen history={history} /> } />
            { loading && <Loader /> }
            { keyword && 
                <Row className='justify-content-center'>
                {restaurants && restaurants.map((restaurant) => (
                    <Col className='py-2' md={4} key={restaurant._id}>
                        <Card style={{ width: 'auto', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }}>
                        <Card.Body>
                            <Card.Title><b>{restaurant.name}</b></Card.Title>
                            <Card.Text>{restaurant.description}</Card.Text>
                            <Card.Text><i className="fas fa-map-marker-alt"></i> {restaurant.state}</Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                        </Card>
                    </Col>
                ))}
                {dishes && dishes.map((dish) => (
                    <Col className='py-2' md={4} key={dish._id}>
                        <Card style={{ width: 'auto', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }}>
                        <Card.Body>
                            <Card.Title as='div'>
                                <strong style={{ fontSize: '1.3rem' }}>{dish.name}</strong>
                                { dish.type === 'Veg' ?
                                    <img src='/images/veg.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Veg'></img> 
                                :
                                    <img src='/images/nv.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Non Veg'></img>
                                }
                            </Card.Title>
                            <Card.Text>{dish.description}</Card.Text>
                            <Card.Text><h4><strong>₹{getStringPrice(dish.cost)}/-</strong></h4></Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            }
        </Container>
    )
}

export default HomeScreen
