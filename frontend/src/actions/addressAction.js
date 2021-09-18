import axios from "axios"
import { ADD_NEW_ADDRESS_FAIL, ADD_NEW_ADDRESS_REQUEST, ADD_NEW_ADDRESS_SUCCESS, LIST_ADDRESS_FAIL, LIST_ADDRESS_REQUEST, LIST_ADDRESS_SUCCESS } from "../constants/addressConstants"

export const addAddress = (address) => async(dispatch, getState) => {
    try {
        dispatch({ type: ADD_NEW_ADDRESS_REQUEST })

        const { userLogin:  { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post('/api/address/add', address, config)

        dispatch({ type: ADD_NEW_ADDRESS_SUCCESS })
    } catch (error) {
        dispatch({
            type: ADD_NEW_ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listAddress = () => async(dispatch, getState) => {
    try {
        dispatch({ type: LIST_ADDRESS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/address/list`, config)

        dispatch({
            type: LIST_ADDRESS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LIST_ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}