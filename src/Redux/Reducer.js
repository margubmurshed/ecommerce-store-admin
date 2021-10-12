import * as ActionTypes from './ActionTypes';
const INITIAL_STATE = {
    products: [],
    catagories: [],
    orders: [],
    users: [],
    user: null
}

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.loadProducts:
            return {
                ...state,
                products: action.payload
            }
        case ActionTypes.loadCatagories:
            return {
                ...state,
                catagories: action.payload
            }
        case ActionTypes.loadOrders:
            return {
                ...state,
                orders: action.payload
            }
        case ActionTypes.loadUsers:
            return {
                ...state,
                users: action.payload
            }
        case ActionTypes.setUser:
            return {
                ...state,
                user: action.payload
            }
        default: return state;
    }
}

export default Reducer;