import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	ADD_TODO
} from '../types';

// login
export const loginUser = (userData) => (dispatch) => {
	console.log(userData);
	localStorage.setItem('userName', userData);
	dispatch({ type: SET_USER, payload: userData });
};

// logout
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('userName');
	dispatch({ type: SET_UNAUTHENTICATED });
};
