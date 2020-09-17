import {ADD_TODO} from '../types';

const initialState = {
    todo: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todo: action.todo
            }
		default:
			return state;
	}
}