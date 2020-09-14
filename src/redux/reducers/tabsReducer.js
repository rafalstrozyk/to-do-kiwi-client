import {ADD_TAB,SET_TABS,DELETE_TAB} from '../types'
const initialState = {
    tabels : [
        {
            id: 1,
            label: 'Test1'
        },
        {
            id: 2,
            label: 'Test2'
        },
        {
            id: 3,
            label: 'Test3'
        },
        {
            id: 4,
            label: 'Test4'
        },
        {
            id: 5,
            label: 'Test5'
        },
        {
            id: 6,
            label: 'Test6'
        }
    ],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TAB:
            return {
                ...state,
                tabels: state.tabels.concat(action.tab)
            }
		default:
			return state;
	}
}