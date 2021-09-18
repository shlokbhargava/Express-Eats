import { ADD_NEW_ADDRESS_FAIL, ADD_NEW_ADDRESS_REQUEST, ADD_NEW_ADDRESS_SUCCESS, LIST_ADDRESS_FAIL, LIST_ADDRESS_REQUEST, LIST_ADDRESS_SUCCESS } from "../constants/addressConstants";

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