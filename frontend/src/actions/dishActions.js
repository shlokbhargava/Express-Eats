import axios from "axios"
import { DISH_CREATE_FAIL, DISH_CREATE_REQUEST, DISH_CREATE_SUCCESS, DISH_LIST_FAIL, DISH_LIST_REQUEST, DISH_LIST_SUCCESS } from "../constants/dishConstants"


export const createDish = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DISH_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post('/api/dish', { id }, config)

        dispatch({
            type: DISH_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISH_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listDishes = (id) => async(dispatch) => {
    try {
        dispatch({ type: DISH_LIST_REQUEST })

        const { data } = await axios.get(`/api/dish/${id}`)

        dispatch({
            type: DISH_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISH_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
