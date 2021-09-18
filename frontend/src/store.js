import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers'
import { sellerRegisterReducer } from './reducers/sellerReducers'
import { restaurantDetailsReducer, restaurantEditReducer, restaurantListReducer } from './reducers/restaurantReducers'
import { dishCreateReducer, dishDeleteReducer, dishDetaisReducer, dishEditReducer, dishesListReducer, dishListReducer } from './reducers/dishReducers'
import { cartReducer } from './reducers/cartReducers'
import { addAddressReducer, addressListReducer } from './reducers/addressReducers'

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    sellerRegister: sellerRegisterReducer,
    cart: cartReducer,
    restaurantDetails: restaurantDetailsReducer,
    restaurantEdit: restaurantEditReducer,
    restaurantList: restaurantListReducer,
    dishCreate: dishCreateReducer,
    dishList: dishListReducer,
    dishesList: dishesListReducer,
    dishEdit: dishEditReducer,
    dishDetails: dishDetaisReducer,
    dishDelete: dishDeleteReducer,
    addAddress: addAddressReducer,
    addressList: addressListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo') ? JSON.parse(localStorage.getItem('restaurantInfo')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
    restaurantDetails: { restaurantInfo: restaurantInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store