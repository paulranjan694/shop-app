import CartActionTypes from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
    hidden : true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    // console.log('from cart reducer - ', !state.hidden);
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEMS:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;