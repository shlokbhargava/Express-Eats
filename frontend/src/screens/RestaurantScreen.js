import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Dish from '../components/Dish'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Restaurant from '../components/Restaurant'

const RestaurantScreen = () => {
    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { loading, error, restaurantInfo } = restaurantDetails

    const dishList = useSelector((state) => state.dishList)
    const { loading: loadingDish, error: errorDish, dishes } = dishList

    return (
        <Container>
            { loading && <Loader /> }
            { error && <Message variant='danger'></Message> }
            <Restaurant restaurant={restaurantInfo} />
            <div className='flex'>
                { loadingDish && <Loader /> }
                { errorDish && <Message variant='danger'></Message> }
                { dishes && dishes.map((dish) => (
                    <div key={dish._id}>
                        <Dish dish={dish} restaurant={restaurantInfo} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default RestaurantScreen
