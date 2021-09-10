import axios from "axios"
import { DISH_CREATE_FAIL, DISH_CREATE_REQUEST, DISH_CREATE_SUCCESS, DISH_DELETE_FAIL, DISH_DELETE_REQUEST, DISH_DELETE_SUCCESS, DISH_DETAILS_FAIL, DISH_DETAILS_REQUEST, DISH_DETAILS_SUCCESS, DISH_EDIT_FAIL, DISH_EDIT_REQUEST, DISH_EDIT_SUCCESS, DISH_LIST_FAIL, DISH_LIST_REQUEST, DISH_LIST_SUCCESS } from "../constants/dishConstants"


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


export const listDishDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: DISH_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/dish/detail/${id}`)

        dispatch({
            type: DISH_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISH_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const editDish = (id, dish) => async(dispatch, getState) => {
    try {
        dispatch({ type: DISH_EDIT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/dish/${id}/edit`, dish, config)

        dispatch({
            type: DISH_EDIT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISH_EDIT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const deleteDish = (dishId) => async(dispatch, getState) => {
    try {
        dispatch({ type: DISH_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/dish/${dishId}/delete`, config)

        dispatch({
            type: DISH_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: DISH_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}