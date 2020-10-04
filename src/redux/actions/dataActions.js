import {
	ADD_TAB,
	ADD_TODO,
	SET_TABS,
	SET_TODOS,
	DELETE_TODO,
	DELETE_TAB
} from '../types';
import { db, firebase } from '../../firebase';

export const loadTabs = () => (dispatch) => {
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
			dispatch({ type: SET_TABS, payload: tabsArray });
		})
		.catch((err) => {
			console.error(err);
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
		});
};

export const loadTodo = (tabId) => (dispatch) => {
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
		});
};
