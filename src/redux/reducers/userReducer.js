import {
    SET_USER,
    SET_UNAUTHENTICATED,
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    userName: '',
    notifications: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_UNAUTHENTICATED: 
            return initialState
        case SET_USER: 
            return {
                ...state,
                authenticated: true,
                loading: false,
                userName: action.payload
            }
        default:
            return state;
    }
}