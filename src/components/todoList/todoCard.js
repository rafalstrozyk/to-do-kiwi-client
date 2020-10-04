import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {deleteTodo} from '../../redux/actions/dataActions';

const useStyles = makeStyles({
	root: {
		minWidth: 180,
		margin: 10
    },
    content: {
        padding: "0 15px 0 15px"
    },
	desc: {
		margin: '12px 0 0 0'
	}
});

function TodoCard(props) {
	const { todo, deleteTodo } = props;
    const classes = useStyles();
    
    const handleDone = () => {
        deleteTodo(todo);
    }

	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<Typography variant='h5' component='h2'>
					{todo.title}
				</Typography>

				<Typography className={classes.desc} variant='body1' component='p'>
					{todo.desc}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton color='primary' onClick={handleDone} aria-label='done-todo' component='span'>
					<CheckIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}

TodoCard.propTypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default connect(null, {deleteTodo})(TodoCard);
