// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { combineWithDevTools, composeWithDevTools } from 'redux-devtools-extension'
// import { productListReducer, productDetailsReducer } from './reducers/productReducers'


// const reducer = combineReducers({
//     productList: productListReducer,
//     productDetails: productDetailsReducer,
// })

// const initialState = {}

// const middleware = [thunk]


// const store = createStore(reducer, initialState, 
//     composeWithDevTools(applyMiddleware(...middleware)))



// export default store


import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null 


const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin : {userInfo: userInfoFromStorage},
  }
  

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
  },
  
    initialState,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production', // Enable devtools only in non-production environment
  });

export default store;



