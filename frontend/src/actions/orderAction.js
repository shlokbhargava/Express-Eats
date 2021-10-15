import axios from "axios"
import { CONFIRM_ORDER_FAIL, CONFIRM_ORDER_REQUEST, CONFIRM_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELIVER_ORDER_FAIL, DELIVER_ORDER_REQUEST, DELIVER_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_OUT_FOR_DELIVERY_FAIL, ORDER_OUT_FOR_DELIVERY_REQUEST, ORDER_OUT_FOR_DELIVERY_SUCCESS, PREPARE_ORDER_REQUEST, PREPARE_ORDER_SUCCESS } from "../constants/orderConstants";

export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const confirmOrder = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: CONFIRM_ORDER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/confirm`, {}, config)

        dispatch({
            type: CONFIRM_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CONFIRM_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const prepareOrder = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: PREPARE_ORDER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/prepare`, {}, config)

        dispatch({
            type: PREPARE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PREPARE_ORDER_REQUEST,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const outForDeliveryOrder = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_OUT_FOR_DELIVERY_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/outfordelivery`, {}, config)

        dispatch({
            type: ORDER_OUT_FOR_DELIVERY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_OUT_FOR_DELIVERY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deliverOrder = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: DELIVER_ORDER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config)

        dispatch({
            type: DELIVER_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELIVER_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
