import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createDish, listDishes } from '../actions/dishActions'
import { DISH_CREATE_RESET } from '../constants/dishConstants'
import Dish from '../components/Dish'
import Restaurant from '../components/Restaurant'


const SellerDashboard = ({ history }) => {
    const dispatch = useDispatch()

    const [smShow, setSmShow] = useState(false)

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
        dispatch(listDishes(restaurantInfo._id))
    }, [userInfo, history, restaurantInfo, successCreate, successDelete, dispatch, dish])

    const addDishHandler = () => {
        setSmShow(true)
        dispatch(createDish(restaurantInfo._id))
    }

    return (
        <>
            { loading && <Loader /> }
            { error && <Message variant='daner'>{error}</Message> }
            <Restaurant restaurant={restaurantInfo} history={history} />
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
            <div className='flex'>
                { loadingDish && <Loader /> }
                { errorDish && <Message variant='danger'>{errorDish}</Message> }
                { dishes && !loadingDish && dishes.length === 0 &&
                <Message variant='dark'>{`${restaurantInfo.name} is currently serving no dishes, come back later`}</Message> 
                }
                { errorDelete && <Message variant='danger'>{errorDelete}</Message>  }
                <br></br>
                { dishes && dishes.map((dish) => (
                    <div key={dish._id}>
                        <Dish dish={dish} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default SellerDashboard
