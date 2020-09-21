import { ADD_TAB, ADD_TODO } from '../types';
import store from '../store';
import { db } from '../../firebase';
import { actionTypes } from 'redux-firestore';

export const loadTab = () => {};

export const addTab = (tab) => {
	return function (dispatch) {
        return  db.collection("tabs").add(tab)
	    .then((docRef) => {
	        tab.id = docRef.id;

	    })
	    .then(() => {
	        dispatch({ type: ADD_TAB, tab });
	    })
	    .catch((err => {
	        console.error(err);
	    }))
		// return store.firestore
		// 	.runTransaction((t) => {
		// 		return t.add({ collection: 'tabs' }, tab);
		// 	})
		// 	.then((result) => {
		// 		tab.id = result.id;
		// 		dispatch({ type: ADD_TAB, tab });
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
	};

	db.collection("tabs").add(tab)
	    .then((docRef) => {
	        tab.id = docRef.id;

	    })
	    .then(() => {
	        return {
	            type: ADD_TAB,
	            tab
	        }
	    })
	    .catch((err => {
	        console.error(err);
	    }))
};

export const loadTodo = () => {};

export const addTodo = (todo) => {
	return {
		type: ADD_TODO,
		todo
	};
};
