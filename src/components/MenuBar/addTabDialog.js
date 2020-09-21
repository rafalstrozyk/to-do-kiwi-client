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
import { addTab } from '../../redux/actions/dataActions';
import {connect} from 'react-redux';

function AddTabDialog(props) {
	const [open, setOpen] = useState(false);
	const {addTab, UI} = props;
	const [label, setLabel] = useState('');
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
            label,
            todos: []
        }
        setOpen(false);
		addTab(todo);
		
	}

	return (
		<div>
			<Typography variant='body1' onClick={handleClickOpen} component='p'>
				Add Tabel
			</Typography>
			<Dialog
				onClose={handleClose}
				aria-labelledby='simple-dialog-label'
				open={open}
			>
				<DialogTitle id='simple-dialog-label'>Make Tabel</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Create you table for todos.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='label'
						label='Label'
						type='text'
						fullWidth
						onChange={e => setLabel(e.target.value)}
					/>
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
AddTabDialog.propTypes = {
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	UI: state.UI
});


export default connect(mapStateToProps, {addTab})(AddTabDialog);