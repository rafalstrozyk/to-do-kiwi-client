import {
	SET_ERRORS,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
	CHANGE_RADIO_TAB,
	LOADIN_TABS,
} from '../types';

const initialState = {
	loading: false,
	errors: null,
	radioTab: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null
			};
		case LOADIN_TABS:
			return {
				...state,
				loading: true
			};
		case STOP_LOADING_UI:
			return {
				...state,
				loading: false
			};
		case CHANGE_RADIO_TAB:
			return {
				...state,
				radioTab: action.tabId
			};
		default:
			return state;
	}
};
