import {
	SET_USER,
	SET_UNAUTHENTICATED,
	RESET_DATA
} from '../types';

export const loadUser = () => (dispatch) => {
	if (localStorage.getItem('userName')) {
		dispatch({ type: SET_USER, payload: localStorage.getItem('userName') });
	} 
};
// login
export const loginUser = (userData) => (dispatch) => {

	localStorage.setItem('userName', userData);
	dispatch({ type: SET_USER, payload: userData });
};

// logout
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('userName');
	dispatch({ type: SET_UNAUTHENTICATED });
	dispatch({ type:  RESET_DATA });
};
