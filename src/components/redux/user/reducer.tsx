import UserType from "./user-type";

interface State {
    currentUser: null | string;
}

interface Action {
    type: string;
    payload?: any;
}


const initialState: State = {
    currentUser: null
}

// Reducer
let userReducer = (state: State = initialState, action: Action) => {
    if (action.type === UserType.Login) {
        return { ...state, currentUser: action.payload }
    }
    return state
}

export default userReducer;
