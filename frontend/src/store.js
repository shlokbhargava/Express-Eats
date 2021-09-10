import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers'
import { sellerRegisterReducer } from './reducers/sellerReducers'
import { restaurantDetailsReducer } from './reducers/restaurantReducers'
import { dishCreateReducer, dishDeleteReducer, dishDetaisReducer, dishEditReducer, dishListReducer } from './reducers/dishReducers'

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    sellerRegister: sellerRegisterReducer,
    restaurantDetails: restaurantDetailsReducer,
    dishCreate: dishCreateReducer,
    dishList: dishListReducer,
    dishEdit: dishEditReducer,
    dishDetails: dishDetaisReducer,
    dishDelete: dishDeleteReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo') ? JSON.parse(localStorage.getItem('restaurantInfo')) : {}

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    restaurantDetails: { restaurantInfo: restaurantInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store