import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTodo } from '../../redux/actions/dataActions';

function TodoList(props) {
	const { tabId, data, loadTodo } = props;
	

	const index = data.tabels.findIndex((item) => {
		return item.id === tabId;
	})

	useEffect(() => {
		loadTodo(tabId);
	}, [loadTodo, tabId]); 

	return (
		<div>
			{data.tabels[index].todoArray.map(todo => (
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
	data: PropTypes.object.isRequired,
	loadTodo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { loadTodo })(TodoList);
