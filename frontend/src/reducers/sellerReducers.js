import { SELLER_REGISTER_FAIL, SELLER_REGISTER_REQUEST, SELLER_REGISTER_SUCCESS } from "../constants/sellerConstants"


export const sellerRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case SELLER_REGISTER_REQUEST:
            return { loading: true }
        case SELLER_REGISTER_SUCCESS:
            return { loading: false, success: true }
        case SELLER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}