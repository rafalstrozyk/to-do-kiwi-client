import {
	SET_ERRORS,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
	CHANGE_RADIO_TAB,
	LOADIN_TABS,
	SET_INFO,
	CLEAR_INFO
} from '../types';

const initialState = {
	loading: false,
	errors: null,
	radioTab: null,
	info: null,
	severity: null,
	alert: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload,
				severity: 'error',
				alert: true,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null,
				severity: null,
				alert: false
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
		case SET_INFO:
			return {
				...state,
				info: action.payload,
				severity: 'success',
				alert: true
			};
		case CLEAR_INFO:
			return {
				...state,
				info: null,
				severity: null,
				alert: false
			};
		default:
			return state;
	}
};
