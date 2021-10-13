import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
// import { listDishes } from '../actions/dishActions'
// import { restaurant } from '../actions/restaurantActions'
import Dish from '../components/Dish'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Restaurant from '../components/Restaurant'

const RestaurantScreen = () => {
    // const id = match.params.id 

    // const dispatch = useDispatch()

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { loading, error, restaurantInfo } = restaurantDetails

    const dishList = useSelector((state) => state.dishList)
    const { loading: loadingDish, error: errorDish, dishes } = dishList

    // useEffect(() => {
    //     if (!success) {
    //         dispatch(restaurant(id))
    //         dispatch((listDishes(restaurantInfo._id)))
    //     }
    // }, [success, dishes, dispatch, id, restaurantInfo])

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
