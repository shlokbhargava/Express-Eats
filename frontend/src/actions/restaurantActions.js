import { RESTAURANT_DETAILS_FAIL, RESTAURANT_DETAILS_REQUEST, RESTAURANT_DETAILS_SUCCESS } from "../constants/restaurantConstants"
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
    } catch (error) {
        dispatch({
            type: RESTAURANT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}