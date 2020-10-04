import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTodo } from '../../redux/actions/dataActions';
import TodoCard from './todoCard';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	}
})
function TodoList(props) {
	const { tabId, data, loadTodo } = props;
	const classes = useStyles();
	
	const index = data.tabels.findIndex((item) => {
		return item.id === tabId;
	})

	useEffect(() => {
		loadTodo(tabId);
	}, [loadTodo, tabId]); 

	return (
		<div className={classes.root}>
			{data.tabels[index].todoArray.map(todo => (
				<TodoCard key={todo.id} todo={todo}/>
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
