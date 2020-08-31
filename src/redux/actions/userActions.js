import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER
} from '../types';
import axios from 'axios';

// login
export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/login', userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			// dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch((err) => {
			dispatch({ type: SET_ERRORS, payload: err.response.data });
		});
};

// logout
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};

// // Get login user data
// const getUserData = () => (dispatch) =>{
//     dispatch({type: LOADING_USER});
//     axios

// }

// Set user Authorization
const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
	localStorage.setItem('FBIdToken', FBIdToken);
	axios.defaults.headers.common['Authorization'] = FBIdToken;
};
