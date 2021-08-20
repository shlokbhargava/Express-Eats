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

    console.log(dish.image)

    return (
        // <Card className="my-3 p-2" style={{ width: '30vw' }}>
        //     <Row>
        //         <Col xs={4}>
        //             <Card.Img src={dish.image} style={{ height: 'auto' }} />
        //         </Col>
        //         <Col>
        //             <Card.Title as='div'>
        //                 <h4 style={{ textAlign: 'none' }}><strong>{dish.name}</strong></h4>
        //             </Card.Title>
        //                 <Card.Text>{dish.description}</Card.Text>

        //             <h3><small>₹</small>{getStringPrice(dish.cost)}</h3>

        //             { restaurantInfo ? 
        //                 <Row>
        //                     <Link to={`/dish/${dish._id}/edit`} as={Col}>
        //                         <Button className='btn' size="sm">Edit</Button>
        //                     </Link>
        //                     <Link to='' as={Col} >
        //                         <Button className='btn' size="sm">Delete</Button>
        //                     </Link>
        //                 </Row>
        //             :
        //                 <Button className='btn' size="sm">Add to Cart</Button>   
        //             }
        //         </Col>
        //     </Row>
        // </Card> 
        <Card className="my-3 rounded" style={{ width: '18rem' }} >
            <Card.Img src={dish.image} variant='top' style={{ height: '22vh' }} />

            <Card.Body>
                <Card.Title as='div'>
                    <strong>{dish.name}</strong>
                </Card.Title>

                <p>{dish.description}.</p>

                <h3><small>₹</small>{getStringPrice(dish.cost)}</h3>
            </Card.Body>
        </Card>
    )
}

export default Dish
