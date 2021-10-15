import { CONFIRM_ORDER_FAIL, CONFIRM_ORDER_REQUEST, CONFIRM_ORDER_RESET, CONFIRM_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELIVER_ORDER_FAIL, DELIVER_ORDER_REQUEST, DELIVER_ORDER_RESET, DELIVER_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_OUT_FOR_DELIVERY_FAIL, ORDER_OUT_FOR_DELIVERY_REQUEST, ORDER_OUT_FOR_DELIVERY_RESET, ORDER_OUT_FOR_DELIVERY_SUCCESS, PREPARE_ORDER_FAIL, PREPARE_ORDER_REQUEST, PREPARE_ORDER_RESET, PREPARE_ORDER_SUCCESS } from "../constants/orderConstants";

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
            return { loading: false, orders: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}


export const orderConfirmReducer = (state = {}, action) => {
    switch(action.type) {
        case CONFIRM_ORDER_REQUEST:
            return { loading: true }
        case CONFIRM_ORDER_SUCCESS:
            return { loading: false, success: true }
        case CONFIRM_ORDER_FAIL:
            return { loading: false, error: action.payload }
        case CONFIRM_ORDER_RESET:
            return {}
        default:
            return state
    }
}


export const orderPrepareReducer = (state = {}, action) => {
    switch(action.type) {
        case PREPARE_ORDER_REQUEST:
            return { loading: true }
        case PREPARE_ORDER_SUCCESS:
            return { loading: false, success: true }
        case PREPARE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        case PREPARE_ORDER_RESET:
            return {}
        default:
            return state
    }
}


export const orderOutForDeliveryReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_OUT_FOR_DELIVERY_REQUEST:
            return { loading: true }
        case ORDER_OUT_FOR_DELIVERY_SUCCESS:
            return { loading: false, success: true }
        case ORDER_OUT_FOR_DELIVERY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_OUT_FOR_DELIVERY_RESET:
            return {}
        default:
            return state
    }
}


export const orderDeliverReducer = (state = {}, action) => {
    switch(action.type) {
        case DELIVER_ORDER_REQUEST:
            return { loading: true }
        case DELIVER_ORDER_SUCCESS:
            return { loading: false, success: true }
        case DELIVER_ORDER_FAIL:
            return { loading: false, error: action.payload }
        case DELIVER_ORDER_RESET:
            return {}
        default:
            return state
    }
}