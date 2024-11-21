import { combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { productListReducer, productReducer } from './reducers/product';
import { userLoginReducer, userRegisterReducer } from './reducers/user';
import { cartReducer } from './reducers/cart';
import { orderReducer, orderListReducer, orderDetailReducer, orderPaymentReducer } from './reducers/order';

const persistConfig = {
    key: 'root',
    storage,
  }


  const rootReducer = combineReducers({
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer,
    cartReducer,
    orderReducer,
    orderListReducer,
    orderDetailReducer,
    orderPaymentReducer 
  })

 

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({reducer: persistedReducer, devTools: process.env.NODE_ENV !== 'production'})

  export const persistor = persistStore(store)