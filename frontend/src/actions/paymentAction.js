import axios from "axios"
import { ORDER_PAYMENT_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS } from "../constants/paymentConstants"

export const checkOut = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAYMENT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/payments/create-checkout-session', order, config)

        dispatch({
            type: ORDER_PAYMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAYMENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}