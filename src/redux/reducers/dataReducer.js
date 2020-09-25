import { ADD_TAB, ADD_TODO, SET_TABS } from '../types';
const initialState = {
	tabels: [
	]
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TAB:
			return {
				...state,
				tabels: state.tabels.concat(action.payload)
			};
		case ADD_TODO:
			let newArray = [];
			state.tabels.forEach((item) => {
				if (item.id === action.payload.tabId) {
					item.todos.push(action.payload);
				}
				newArray.push(item);
			});
			return {
				...state,
				tabels: newArray,
			};
		case SET_TABS: 
			return {
				...state, 
				tabels: action.payload
			}
		default:
			return state;
	}
};
