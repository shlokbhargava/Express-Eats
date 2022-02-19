import { UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true }
        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const orderDetailsReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true, orders: [] }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, success: true, orders: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}


export const orderUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_ORDER_REQUEST:
            return { loading: true }
        case UPDATE_ORDER_SUCCESS:
            return { loading: false }
        case UPDATE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_ORDER_RESET:
            return {}
        default:
            return state
    }
}


