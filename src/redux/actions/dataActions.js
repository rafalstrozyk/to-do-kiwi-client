import {
	ADD_TAB,
	ADD_TODO,
	SET_TABS,
	SET_TODOS,
	DELETE_TODO,
	DELETE_TAB,
	LOADING_UI,
	STOP_LOADING_UI,
	SET_ERRORS
} from '../types';
import { db, firebase } from '../../firebase';

export const loadTabs = () => (dispatch) => {
	dispatch({type: LOADING_UI}) //TODO load tabs? 
	db.collection('tabs')
		.get()
		.then((snapshot) => {
			let tabsArray = [];
			snapshot.docs.forEach((tab) => {
				let loadTab = tab.data();
				loadTab.id = tab.id;
				loadTab.todoArray = [];
				tabsArray.push(loadTab);
			});
			dispatch({type: STOP_LOADING_UI})
			dispatch({ type: SET_TABS, payload: tabsArray });
		})
		.catch((err) => {
			console.error(err);
			dispatch({type: STOP_LOADING_UI})
			dispatch({type: SET_ERRORS, payload: err})
		});
};

export const addTab = (tab) => (dispatch) => {
	db.collection('tabs')
		.add(tab)
		.then((doc) => {
			tab.id = doc.id;
			tab.todoArray = [];
			dispatch({ type: ADD_TAB, payload: tab });
		})
		.catch((err) => {
			console.error(err);
			dispatch({type: STOP_LOADING_UI})
			dispatch({type: SET_ERRORS, payload: err})
		});
};

export const deleteTab = (tab) => (dispatch) => {
	db.collection('tabs').doc(tab.id)
		.delete()
		.then(() => {
			db.collection('todos')
			.where('tabId', "==", tab.id)
			.get()
			.then((snapshot) => {
				snapshot.forEach(doc => {
					doc.ref.delete();
				})
			})
		})
} 

export const loadTodo = (tabId) => (dispatch) => {
	dispatch({type: LOADING_UI}) //TODO load todo?
	db.collection('todos')
		.where('tabId', '==', tabId)
		.get()
		.then((snapshot) => {
			let todosArray = [];
			snapshot.docs.forEach((todo) => {
				let loadTodo = todo.data();
				loadTodo.id = todo.id;
				todosArray.push(loadTodo);
			});
			if (todosArray.length > 0) {
				dispatch({ type: SET_TODOS, payload: todosArray });
			}
		})
		.catch((err) => {
			console.error(err);
			dispatch({type: STOP_LOADING_UI})
			dispatch({type: SET_ERRORS, payload: err})
		});
};

export const addTodo = (todo) => (dispatch) => {
	db.collection('todos')
		.add(todo)
		.then((doc) => {
			todo.id = doc.id;
			dispatch({
				type: ADD_TODO,
				payload: todo
			});
		})
		.then(() => {
			db.collection('tabs')
				.doc(todo.tabId)
				.update({
					todos: firebase.firestore.FieldValue.increment(1)
				});
		})
		.catch((err) => {
			console.error(err);
			dispatch({type: STOP_LOADING_UI})
			dispatch({type: SET_ERRORS, payload: err})
		});
};

export const deleteTodo = (todo) => (dispatch) => {
	db.collection('todos')
		.doc(todo.id)
		.delete()
		.then(() => {
			db.collection('tabs')
				.doc(todo.tabId)
				.update({
					todos: firebase.firestore.FieldValue.increment(-1)
				});
		})
		.then(() => {
			dispatch({ type: DELETE_TODO, payload: todo.id });
		})
		.catch((err) => {
			console.error(err);
			dispatch({type: STOP_LOADING_UI})
			dispatch({type: SET_ERRORS, payload: err})
		});
};
