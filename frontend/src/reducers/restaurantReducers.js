import { LIST_RESTAURANT_FAIL, LIST_RESTAURANT_REQUEST, LIST_RESTAURANT_SUCCESS, RESTAURANT_DETAILS_FAIL, RESTAURANT_DETAILS_REQUEST, RESTAURANT_DETAILS_SUCCESS, RESTAURANT_EDIT_FAIL, RESTAURANT_EDIT_REQUEST, RESTAURANT_EDIT_RESET, RESTAURANT_EDIT_SUCCESS } from "../constants/restaurantConstants";


export const restaurantDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case RESTAURANT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case RESTAURANT_DETAILS_SUCCESS:
            return { loading: false, restaurantInfo: action.payload }
        case RESTAURANT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const restaurantListReducer = (state = { restaurants: [] }, action) => {
    switch (action.type) {
        case LIST_RESTAURANT_REQUEST:
            return { loading: true, restaurants: [] }
        case LIST_RESTAURANT_SUCCESS:
            return { loading: false, restaurants: action.payload }
        case LIST_RESTAURANT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const restaurantEditReducer = (state = { restaurant: {} }, action) => {
    switch (action.type) {
        case RESTAURANT_EDIT_REQUEST:
            return { loading: true, ...state }
        case RESTAURANT_EDIT_SUCCESS:
            return { loading: false, success: true, restaurant: action.payload }
        case RESTAURANT_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_EDIT_RESET:
            return {}
        default:
            return state
    }
}