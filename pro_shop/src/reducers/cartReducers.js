import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            var item = action.payload
            var existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem) {
                if (item.updateType === "ADD") {
                    item.qty =  Number(item.qty) + Number(existItem.qty)
                }
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => 
                     x.product === existItem.product ? item : x)
                    }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        default:
            return state

    }
}