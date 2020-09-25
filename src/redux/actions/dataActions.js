import { ADD_TAB, ADD_TODO, SET_TABS } from '../types';
import { db, firebase } from '../../firebase';

export const loadTabs = () => dispatch => {

	db.collection('tabs')
		.get()
		.then(snapshot => {
			let tabsArray = [];
			snapshot.docs.map(tab => {
				let loadTab = tab.data();
				loadTab.id = tab.id;
				tabsArray.push(loadTab)
			})
			dispatch({type: SET_TABS, payload: tabsArray})
		})
		.catch(err => {
			console.error(err);
		})
};

export const addTab = (tab) => dispatch => {
	db.collection('tabs')
		.add(tab)
		.then((doc) => {
			tab.id = doc.id;
			dispatch({type: ADD_TAB, payload: tab});
		})
		.catch(err => {
			console.error(err)
		})
};

export const loadTodo = () => {};

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
					todos: firebase.firestore.FieldValue.arrayUnion(todo.id)
				});
		})
		.catch(err => {
			console.error(err);
		})
};
