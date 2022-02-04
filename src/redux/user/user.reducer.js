// Reducer is a function getting two props initial/last state obj and and an action

import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
    
        default:
            return state;
    }
}

export default userReducer;