import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";


// Combine all reducers
export default combineReducers({
    user: userReducer,
    cart: cartReducer,
});