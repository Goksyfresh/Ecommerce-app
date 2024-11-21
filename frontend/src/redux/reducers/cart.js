import {
    ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_PAYMENT_METHOD, CART_ITEM_CLEAR, CART_SAVE_SHIPPING_ADDRESS
} from '../constant/orderConstant'

export const cartReducer = (state={cartItems:[], shippingAddress:{}}, action) => {
    switch(action.type){
        case ADD_ITEM_TO_CART:
            const item =action.payload
            const existItem = state.cartItems.find((cartItem)=> cartItem.product === item.product)
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map((cartItem) => {
                        return cartItem.product === existItem.product ? item : cartItem
                    })
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }


            }

            case REMOVE_ITEM_FROM_CART:
                return{
                    ...state, cartItems: state.cartItems.filter((cartItem)=> cartItem.product !== action.payload)
                }
            case CART_SAVE_SHIPPING_ADDRESS:
                return{
                    ...state, shippingAddress: action.payload
                }
            case SAVE_PAYMENT_METHOD:
                return{
                    ...state, paymentMethod: action.payload
                }
            case CART_ITEM_CLEAR:
                return{
                    ...state, cartItems: []
                }
            default:
                return state
    }
}