import { ORDER_PAYMENT_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS } from "../constants/paymentConstants"


export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAYMENT_REQUEST:
            return { loading: true }
        case ORDER_PAYMENT_SUCCESS:
            return { loading: false, success: true }
        case ORDER_PAYMENT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}