import {
	SET_USER,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	STOP_LOADING_UI
} from '../types';

export const loadUser = () => (dispatch) => {
	dispatch({ type: LOADING_UI });
	if (localStorage.getItem('userName')) {
		dispatch({ type: SET_USER, payload: localStorage.getItem('userName') });
	} else {
		dispatch({ type: STOP_LOADING_UI });
	}
};
// login
export const loginUser = (userData) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	localStorage.setItem('userName', userData);
	dispatch({ type: SET_USER, payload: userData });
	dispatch({ type: STOP_LOADING_UI });
};

// logout
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('userName');
	dispatch({ type: SET_UNAUTHENTICATED });
};
