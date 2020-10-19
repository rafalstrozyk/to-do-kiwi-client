import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { addTab } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

// MUI
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function AddTabDialog(props) {
	const [open, setOpen] = useState(false);
	const { addTab, user } = props;
	const [label, setLabel] = useState('');

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
		const table = {
			label,
			todos: 0,
			user: user.userName
		};
		setOpen(false);
		addTab(table);
	};

	return (
		<div>
			<Typography variant='body1' onClick={handleClickOpen} component='p'>
				Add Tabel
			</Typography>
			<Dialog
				onClose={handleClose}
				aria-labelledby='create-tabel-dialog'
				open={open}
			>
				<DialogTitle id='create-tabel-dialog-title'>Make Tabel</DialogTitle>
				<DialogContent>
					<DialogContentText>Create you table for todos.</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='label'
						label='Label'
						type='text'
						fullWidth
						onChange={(e) => setLabel(e.target.value)}
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
	user: PropTypes.object.isRequired,
	addTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, { addTab })(AddTabDialog);
