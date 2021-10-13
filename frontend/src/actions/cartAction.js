import { CART_ADD_ITEM, CART_REMOVE_ALL_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants"
import axios from 'axios'

export const addToCart = (id, qty) => async(dispatch, getState) => {

    const { data } = await axios.get(`/api/dish/detail/${id}`)

    dispatch({ 
        type: CART_ADD_ITEM,
        payload: {
            dish: data._id,
            name: data.name,
            image: data.image,
            price: data.cost,
            restaurant: data.restaurant,
            description: data.description,
            qty: qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
}

export const removeFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
} 

export const removeAllFromCart = () => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ALL_ITEMS,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
} 

export const savePaymentMethod = (data) => async(dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}