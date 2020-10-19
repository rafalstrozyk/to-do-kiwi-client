import {
	ADD_TAB,
	ADD_TODO,
	SET_TABS,
	SET_TODOS,
	DELETE_TODO,
	DELETE_TAB,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADIN_TABS,
	STOP_LOADING_UI,
	SET_INFO,
	CLEAR_INFO
} from '../types';
import { db, firebase } from '../../firebase';

export const loadTabs = (user) => (dispatch) => {
	dispatch({ type: LOADIN_TABS });
	db.collection('tabs')
		.where('user', '==', user)
		.get()
		.then((snapshot) => {
			let tabsArray = [];
			snapshot.docs.forEach((tab) => {
				let loadTab = tab.data();
				loadTab.id = tab.id;
				loadTab.todoArray = [];
				tabsArray.push(loadTab);
			});
			dispatch(clearErrors());
			dispatch({ type: SET_TABS, payload: tabsArray });
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => {
			dispatch({ type: SET_ERRORS, payload: err });
		});
};

export const addTab = (tab) => (dispatch) => {
	dispatch(clearInfo());
	db.collection('tabs')
		.add(tab)
		.then((doc) => {
			tab.id = doc.id;
			tab.todoArray = [];
			dispatch(clearErrors());
			dispatch({ type: ADD_TAB, payload: tab });
			dispatch({ type: SET_INFO, payload: 'Create tabel succesfull!' });
		})
		.catch((err) => {
			dispatch({ type: SET_ERRORS, payload: err });
		});
};

export const deleteTab = (tabId) => (dispatch) => {
	dispatch(clearInfo());
	db.collection('tabs')
		.doc(tabId)
		.delete()
		.then(() => {
			db.collection('todos')
				.where('tabId', '==', tabId)
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						doc.ref.delete();
					});

					dispatch({ type: DELETE_TAB });
				})
				.catch((err) => {
					dispatch({ type: SET_ERRORS, payload: err });
				});

			dispatch({ type: SET_INFO, payload: 'Delete tabel succesfull!' });
		})
		.catch((err) => {
			dispatch({ type: SET_ERRORS, payload: err });
		});
};

export const loadTodo = (tabId) => (dispatch) => {
	db.collection('todos')
		.where('tabId', '==', tabId)
		.onSnapshot((snapshot) => {
			let todosArray = [];
			snapshot.docs.forEach((todo) => {
				let loadTodo = todo.data();
				loadTodo.id = todo.id;
				todosArray.push(loadTodo);
			});
			if (todosArray.length > 0) {
				dispatch({ type: SET_TODOS, payload: todosArray });
			}
		});
};

export const addTodo = (todo) => (dispatch) => {
	dispatch(clearInfo());
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
				})
				.catch((err) => {
					dispatch({ type: SET_ERRORS, payload: err });
				});
			dispatch(clearErrors());
			dispatch({ type: SET_INFO, payload: 'Add to-do succesfull!' });
		})
		.catch((err) => {
			dispatch({ type: SET_ERRORS, payload: err });
		});
};

export const deleteTodo = (todo) => (dispatch) => {
	dispatch(clearErrors());
	dispatch(clearInfo());
	db.collection('todos')
		.doc(todo.id)
		.delete()
		.then(() => {
			db.collection('tabs')
				.doc(todo.tabId)
				.update({
					todos: firebase.firestore.FieldValue.increment(-1)
				})
				.catch((err) => {
					dispatch({ type: SET_ERRORS, payload: err });
				});
		})
		.catch((err) => {
			console.log(err);
			dispatch({ type: SET_ERRORS, payload: err });
		});

	dispatch({ type: DELETE_TODO, payload: todo.id });
	dispatch({ type: SET_INFO, payload: 'Delete to-do succesfull!' });
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
export const clearInfo = () => (dispatch) => {
	dispatch({ type: CLEAR_INFO });
};
