import { ADD_TAB, ADD_TODO, SET_TABS, SET_TODOS, DELETE_TODO } from '../types';
const initialState = {
	tabels: []
};

export default (state = initialState, action) => {
	let index = null;
	switch (action.type) {
		case ADD_TAB:
			return {
				...state,
				tabels: state.tabels.concat(action.payload)
			};
		case ADD_TODO:
			index = state.tabels.findIndex((el) => {
				return el.id === action.payload.tabId;
			});
			state.tabels[index].todoArray.push(action.payload);
			state.tabels[index].todos += 1;
			return {
				...state
			};
		case SET_TABS:
			return {
				...state,
				tabels: action.payload
			};
		case SET_TODOS:
			index = state.tabels.findIndex((el) => {
				return el.id === action.payload[0].tabId;
			});
			state.tabels[index].todoArray = action.payload;
			return {
				...state
			};
		case DELETE_TODO:
			state.tabels.forEach((tab) => {
				if (tab.todoArray.length > 0) {
					const index = tab.todoArray
						.map((todo) => {
							return todo.id;
						})
						.indexOf(action.payload);
					if (index > -1) {
						tab.todoArray.splice(index, 1);
					}
				}
			});
			return {
				...state
			};
		default:
			return state;
	}
};
