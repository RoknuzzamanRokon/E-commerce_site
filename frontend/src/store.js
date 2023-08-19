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

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production', // Enable devtools only in non-production environment
});

export default store;
