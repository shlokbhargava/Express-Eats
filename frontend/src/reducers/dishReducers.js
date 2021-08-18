import { DISH_CREATE_FAIL, DISH_CREATE_REQUEST, DISH_CREATE_RESET, DISH_CREATE_SUCCESS, DISH_LIST_FAIL, DISH_LIST_REQUEST, DISH_LIST_SUCCESS } from "../constants/dishConstants";


export const dishCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DISH_CREATE_REQUEST:
            return { loading: true }
        case DISH_CREATE_SUCCESS:
            return { loading: false, success: true, dish: action.payload }
        case DISH_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DISH_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const dishListReducer = (state = { dishes: [] }, action) => {
    switch (action.type) {
        case DISH_LIST_REQUEST:
            return { loading: true, dishes: [] }
        case DISH_LIST_SUCCESS:
            return { loading: false, dishes: action.payload }
        case DISH_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}