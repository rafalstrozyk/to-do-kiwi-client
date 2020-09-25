import { ADD_TAB, ADD_TODO, SET_TABS } from '../types';
import { db, firebase } from '../../firebase';

export const loadTabs = () => {
	let tabsArray = [];
	return function (dispatch) {
		return db
			.collection('tabs')
			.get()
			.then((snapshot) => {
				snapshot.docs.map((doc) => {
					let loadTab = doc.data();
					loadTab.id = doc.id;
					tabsArray.push(loadTab);
					return tabsArray;
				});
			})
			.then(() => {
				dispatch({ type: SET_TABS, payload: tabsArray });
			})
			.catch((err) => {
				console.error(err);
			});
	};
};

export const addTab = (tab) => {
	if (tab.exists) {
		return function (dispatch) {
			return db
				.collection('tabs')
				.add(tab)
				.then((docRef) => {
					tab.id = docRef.id;
				})
				.then(() => {
					dispatch({ type: ADD_TAB, payload: tab });
				})
				.catch((err) => {
					console.error(err);
				});
		};
	} else {
		return null;
	}
};

export const loadTodo = () => {};

export const addTodo = (todo) => {
	if (todo.exist) {
		return function (dispatch) {
			return db
				.collection('todos')
				.add(todo)
				.then((doc) => {
					todo.id = doc.id;
					db.collection('tabs')
						.doc(todo.tabId)
						.update({
							todos: firebase.firestore.FieldValue.arrayUnion(todo.id)
						});
				});
		};
	}
	return {
		type: ADD_TODO,
		todo
	};
};
