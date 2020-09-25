import { ADD_TAB, ADD_TODO, SET_TABS, SET_TODOS } from '../types';
import { db, firebase } from '../../firebase';

export const loadTabs = () => dispatch => {
	db.collection('tabs')
		.get()
		.then(snapshot => {
			let tabsArray = [];
			snapshot.docs.forEach(tab => {
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

export const loadTodo = () => dispatch => {
	db.collection('tabs')
		.get()
		.then(snapshot => {
			let tabsArray = [];
			snapshot.docs.forEach(tab => {
				let loadTab = tab.data();
				loadTab.id = tab.id;
				tabsArray.push(loadTab)
			})
			return tabsArray;
		}).then(tabsArray => {
			let tabsTodosArray = [];
			let todosArray = [];
			db.collection('todos').get()
				.then(snapshot => {
					snapshot.docs.forEach(doc => {
						let loadTodo = doc.data();
						loadTodo.id = doc.id;
						todosArray.push(loadTodo);
					})
					tabsArray.forEach(tab => {
						todosArray.forEach(todo => {
							if(tab.id === todo.tabId) {
								tab.todos.push(todo);
							}
							tabsTodosArray.push(tab);
						})
					})
					dispatch({type: SET_TODOS, payload: tabsTodosArray})
				})
			
		})
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
					todos: firebase.firestore.FieldValue.arrayUnion(todo.id)
				});
		})
		.catch(err => {
			console.error(err);
		})
};
