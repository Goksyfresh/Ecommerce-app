import axios from 'axios';

import {
    ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS
} from '../constant/orderConstant'

import { baseUrl } from '../constant/baseUrl';


export const addToCartAction = (id, qty)=> async (dispatch)=> {
    try {
        const {data} = await axios.get(`${baseUrl}/api/products/${id}`)
      

        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {
                product: data.data._id,
                name: data.data.name,
                image: data.data.image,
                price: data.data.price,
                countInStock: data.data.countInStock,
                qty
            }
        })
        // const cartItems = getState().cartReducer.cartItems
        // localStorage.setItem('cartItems', JSON.stringify(cartItems))
    } catch (error) {
        console.log(error)
    }
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id
    })

//     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
 }

 export const saveShippingAddressAction = (data) => (dispatch)=> {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
 }

 export const savePaymentMethod = (data) => (dispatch)=> {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })
 }