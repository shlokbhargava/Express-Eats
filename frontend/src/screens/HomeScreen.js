import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { listRestaurants } from '../actions/restaurantActions'
import SearchScreen from './SearchScreen'
import Loader from '../components/Loader'

const HomeScreen = ({ match, history }) => {
    const keyword = match.params.keyword

    console.log(keyword)

    const dispatch = useDispatch()

    const restaurantList = useSelector((state) => state.restaurantList)
    const { loading, restaurants } = restaurantList

    useEffect(() => {
        if (keyword) {
            dispatch(listRestaurants(keyword))
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
                <p className='text-center'>Search your favourite restaurant <i className="fas fa-store-alt"></i></p>
            </Row>
            <Route render={({ history }) => <SearchScreen history={history} /> } />
            { loading && <Loader /> }
            { keyword && 
                <Row className='justify-content-center'>
                {restaurants && restaurants.map((restaurant) => (
                    <Col className='py-2' md={4} key={restaurant._id}>
                        <Card style={{ width: 'auto', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }}>
                        <Card.Body>
                            <Card.Title>{restaurant.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>{restaurant.description}</Card.Text>
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
