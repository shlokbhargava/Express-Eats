import { ADDRESS_DETAILS_FAIL, ADDRESS_DETAILS_REQUEST, ADDRESS_DETAILS_SUCCESS, ADD_NEW_ADDRESS_FAIL, ADD_NEW_ADDRESS_REQUEST, ADD_NEW_ADDRESS_SUCCESS, DELETE_ADDRESS_FAIL, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, LIST_ADDRESS_FAIL, LIST_ADDRESS_REQUEST, LIST_ADDRESS_SUCCESS } from "../constants/addressConstants";

export const addAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_ADDRESS_REQUEST:
            return { loading: true }
        case ADD_NEW_ADDRESS_SUCCESS:
            return { loading: false, success: true }
        case ADD_NEW_ADDRESS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const addressListReducer = (state = { addresses: [] }, action) => {
    switch (action.type) {
        case LIST_ADDRESS_REQUEST:
            return { loading: true, addressList: [] }
        case LIST_ADDRESS_SUCCESS:
            return { loading: false, success: true, addresses: action.payload }
        case LIST_ADDRESS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const addressDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_ADDRESS_REQUEST:
            return { laoding: true }
        case DELETE_ADDRESS_SUCCESS:
            return { loading: false, success: true }
        case DELETE_ADDRESS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const addressDetailsReducer = (state = { address: {} }, action) => {
    switch(action.type) {
        case ADDRESS_DETAILS_REQUEST:
            return { loading: true, address: {} }
        case ADDRESS_DETAILS_SUCCESS:
            return { loading: false, success: true, address: action.payload }
        case ADDRESS_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}