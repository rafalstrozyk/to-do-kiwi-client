import React, {useEffect, useState} from 'react';
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

function SimpleDialog(props) {
	const { onClose, open } = props;

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby='simple-dialog-title'
			open={open}
		>
			<DialogTitle id='simple-dialog-title'>Make todo</DialogTitle>
			<DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <CheckboxList />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default function AddTodoDialog(props) {
	const [open, setOpen] = useState(false);


	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);

	};

	return (
		<div>
			<Typography variant='body1' onClick={handleClickOpen} component='p'>
				Add to-do
			</Typography>
			<SimpleDialog
				open={open}
				onClose={handleClose}
			/>
		</div>
	);
}
