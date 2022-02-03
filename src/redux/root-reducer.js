import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";


// Combine all reducers
export default combineReducers({
    user: userReducer,
});