import { DISH_CREATE_FAIL, DISH_CREATE_REQUEST, DISH_CREATE_RESET, DISH_CREATE_SUCCESS, DISH_DELETE_FAIL, DISH_DELETE_REQUEST, DISH_DELETE_SUCCESS, DISH_DETAILS_FAIL, DISH_DETAILS_REQUEST, DISH_DETAILS_SUCCESS, DISH_EDIT_FAIL, DISH_EDIT_REQUEST, DISH_EDIT_RESET, DISH_EDIT_SUCCESS, DISH_LIST_FAIL, DISH_LIST_REQUEST, DISH_LIST_SUCCESS } from "../constants/dishConstants";


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


export const dishEditReducer = (state = { dish: {} }, action) => {
    switch (action.type) {
        case DISH_EDIT_REQUEST:
            return { loading: true }
        case DISH_EDIT_SUCCESS:
            return { loading: false, success: true, dish: action.payload }
        case DISH_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case DISH_EDIT_RESET:
            return {}
        default:
            return state
    }
}


export const dishDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DISH_DELETE_REQUEST:
            return { loading: true }
        case DISH_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DISH_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const dishDetaisReducer = (state = { dish: {} }, action) => {
    switch (action.type) {
        case DISH_DETAILS_REQUEST:
            return { loading: true }
        case DISH_DETAILS_SUCCESS:
            return { loading: false, success: true, dish: action.payload }
        case DISH_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}