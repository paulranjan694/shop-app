import SHOP_DATA from "./shop.data";
import ShopActionTpyes from "./shop.types";

const INITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case ShopActionTpyes.UPDATE_COLLECTIONS:
            return{
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;