import ShopActionTpyes from "./shop.types";

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: ''
}

const shopReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case ShopActionTpyes.FETCH_COLLECTIONS_STARTS:
            return{
                ...state,
                isFetching: true
            }
        case ShopActionTpyes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching:false,
                collections: action.payload
            }
        case ShopActionTpyes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;