import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dish = ({ dish }) => {

    const getStringPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
    }    

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    return (
        <Card className="my-3 p-2" style={{ width: 'auto' }}>
            <Row>
                <Col xs={4}>
                    <Link to={`/dish/${dish._id}`}>
                        <Card.Img src={dish.image} style={{ height: 'auto' }} />
                    </Link>
                </Col>
                <Col>
                    <Link to={`/dish/${dish._id}`}>
                        <Card.Title as='div'>
                            <h4 style={{ textAlign: 'none' }}><strong>{dish.name}</strong></h4>
                        </Card.Title>
                    </Link>
                    <Card.Text>{dish.description}</Card.Text>

                    <Card.Text>
                        <h3><small>₹</small>{getStringPrice(dish.cost)}</h3>
                    </Card.Text> 

                    { restaurantInfo ? 
                        <Row>
                            <Button as={Col} className='btn' size="sm">Edit</Button>
                            <Button as={Col} className='btn' size="sm">Delete</Button>
                        </Row>
                    :
                        <Button className='btn' size="sm">Add to Cart</Button>   
                    }
                </Col>
            </Row>
        </Card> 
    )
}

export default Dish
