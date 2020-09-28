import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTodo } from '../../redux/actions/dataActions';

function TodoList(props) {
	const { tabId, loadTodo } = props;
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		setTodos(loadTodo(tabId));
	}, [loadTodo, tabId]);

	return (
		<div>
			{todos &&
				todos.forEach((todo) => (
					<Fragment key={todo.id}>
						<p>{todo.title}</p>
						<p>{todo.desc}</p>
					</Fragment>
				))}
		</div>
	);
}

TodoList.propTypes = {
	tabId: PropTypes.string.isRequired,
	loadTodo: PropTypes.func.isRequired
};

export default connect(null, { loadTodo })(TodoList);
