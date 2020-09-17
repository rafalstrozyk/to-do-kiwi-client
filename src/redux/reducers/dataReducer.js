import { ADD_TAB, ADD_TODO } from '../types';
const initialState = {
	tabels: [
		{
			id: 1,
			label: 'Test1',
			todo: []
		},
		{
			id: 2,
			label: 'Test2',
			todo: []
		},
		{
			id: 3,
			label: 'Test3',
			todo: []
		},
		{
			id: 4,
			label: 'Test4',
			todo: []
		},
		{
			id: 5,
			label: 'Test5',
			todo: []
		},
		{
			id: 6,
			label: 'Test6',
			todo: []
		}
	]
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TAB:
			return {
				...state,
				tabels: state.tabels.concat(action.tab)
			};
		case ADD_TODO:
			let newArray = [];
			state.tabels.forEach((item) => {
				if (item.id === action.todo.tabId) {
					item.todo.push(action.todo);
				}
				newArray.push(item);
			});
			return {
				...state,
				tabels: newArray,
				todo: action.todo
			};
		default:
			return state;
	}
};
