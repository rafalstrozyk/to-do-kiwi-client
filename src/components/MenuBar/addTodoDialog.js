import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckboxList from './listControl';
import { addTodo } from '../../redux/actions/dataActions';
import {connect} from 'react-redux';

// function SimpleDialog(props) {
// 	const { onClose, open, addTodo, UI, data } = props;

// 	const handleClose = () => {
// 		onClose();
// 	};

// 	return (
// 		<Dialog
// 			onClose={handleClose}
// 			aria-labelledby='simple-dialog-title'
// 			open={open}
// 		>
// 			<DialogTitle id='simple-dialog-title'>Make todo</DialogTitle>
// 			<DialogContent>
// 				<DialogContentText>
// 					Write what you have to do and select the column to which you will add
// 					the task from the list
// 				</DialogContentText>
// 				<TextField
// 					autoFocus
// 					margin='dense'
// 					id='title'
// 					label='The title of the task'
// 					type='text'
// 					fullWidth
// 				/>
// 				<TextField
// 					autoFocus
// 					margin='dense'
// 					id='description'
// 					label='Description'
// 					type='text'
// 					fullWidth
// 				/>
// 				<CheckboxList />
// 			</DialogContent>
// 			<DialogActions>
// 				<Button onClick={handleClose} color='primary'>
// 					Cancel
// 				</Button>
// 				<Button onClick={handleClose} color='primary'>
// 					Ok
// 				</Button>
// 			</DialogActions>
// 		</Dialog>
// 	);
// }

// SimpleDialog.propTypes = {
// 	onClose: PropTypes.func.isRequired,
// 	open: PropTypes.bool.isRequired
// };

function AddTodoDialog(props) {
	const [open, setOpen] = useState(false);
	const {addTodo, data, UI} = props;
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');


	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = () => {
		const todo = {
			id: 1,
			title,
			desc,
			tabId: UI.radioTab
		}
		addTodo(todo);
		setOpen(false);
	}

	return (
		<div>
			<Typography variant='body1' onClick={handleClickOpen} component='p'>
				Add to-do
			</Typography>
			<Dialog
				onClose={handleClose}
				aria-labelledby='simple-dialog-title'
				open={open}
			>
				<DialogTitle id='simple-dialog-title'>Make todo</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Write what you have to do and select the column to which you will
						add the task from the list
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='title'
						label='The title of the task'
						type='text'
						fullWidth
						onChange={e => setTitle(e.target.value)}
					/>
					<TextField
						
						margin='dense'
						id='description'
						label='Description'
						type='text'
						fullWidth
						onChange={e => setDesc(e.target.value)}
					/>
					<CheckboxList />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleSubmit} color='primary'>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
			
		</div>
	);
}

const mapStateToProps = (state) => ({
	data: state.data,
	UI: state.UI
});


export default connect(mapStateToProps, {addTodo})(AddTodoDialog);