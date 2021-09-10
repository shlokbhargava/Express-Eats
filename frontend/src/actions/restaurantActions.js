import { LIST_RESTAURANT_FAIL, LIST_RESTAURANT_REQUEST, LIST_RESTAURANT_SUCCESS, RESTAURANT_DETAILS_FAIL, RESTAURANT_DETAILS_REQUEST, RESTAURANT_DETAILS_SUCCESS, RESTAURANT_EDIT_FAIL, RESTAURANT_EDIT_REQUEST, RESTAURANT_EDIT_SUCCESS } from "../constants/restaurantConstants"
import axios from 'axios'

export const restaurant = (email) => async(dispatch) => {
    try {
        dispatch({ type: RESTAURANT_DETAILS_REQUEST })

        const config = {
            'Content-Type': 'application/json'
        }

        const { data } = await axios.post('/api/restaurant', { email }, config)
    
        dispatch({
            type: RESTAURANT_DETAILS_SUCCESS,
            payload: data
        })

        localStorage.setItem('restaurantInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: RESTAURANT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const editRestaurant = (id, restaurant) => async(dispatch, getState) => {
    try {
        dispatch({ type: RESTAURANT_EDIT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/restaurant/${id}/edit`, restaurant, config)

        dispatch({
            type: RESTAURANT_EDIT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESTAURANT_EDIT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listRestaurants = (keyword = '') => async(dispatch) => {
    try {
        dispatch({ type: LIST_RESTAURANT_REQUEST })

        const { data } = await axios.get(`/api/restaurant?keyword=${keyword}`)

        dispatch({
            type: LIST_RESTAURANT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LIST_RESTAURANT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}