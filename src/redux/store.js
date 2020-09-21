import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
import thunk from 'redux-thunk';
import firebase from '../firebase'

import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';

const initialState = {};
const rfConfig = {};

const middleware = [thunk];

const reducers = combineReducers({
	user: userReducer,
	UI: uiReducer,
	data: dataReducer,
	firestore: firestoreReducer
});

const store = createStore(
	reducers,
	initialState,
	compose(
		reduxFirestore(firebase, rfConfig),
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
