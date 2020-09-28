import { ADD_TAB, ADD_TODO, SET_TABS, SET_TODOS} from '../types';
const initialState = {
	tabels: [
	],
};

export default (state = initialState, action) => {
	let newArray = [];
	switch (action.type) {
		case ADD_TAB:
			return {
				...state,
				tabels: state.tabels.concat(action.payload)
			};
		case ADD_TODO:
			newArray = [];
			state.tabels.forEach((item) => {
				if (item.id === action.payload.tabId) {
					item.todos += 1;
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
		case SET_TODOS: 
		newArray = [];
			state.tabels.forEach((item) => {
				action.payload.forEach(todo => {
					if(item.id === todo.tabId) {
						item.todoArray = action.payload;
					}
				}) 	 
				newArray.push(item);
			});
			return {
				...state, 
				tabels: newArray
			}
		default:
			return state;
	}
};
