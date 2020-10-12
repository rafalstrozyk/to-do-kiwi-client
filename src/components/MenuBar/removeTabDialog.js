import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CheckboxList from './listControl';
import { addTodo } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

function RemoveTabDialog(props) {
	const [open, setOpen] = useState(false);

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
        setOpen(false);
		console.log('delete');
	};

	return (
		<div>
			<Typography variant='body1' onClick={handleClickOpen} component='p'>
				Remove Table
			</Typography>
			<Dialog
				onClose={handleClose}
				aria-labelledby='remove-table'
				open={open}
			>
				<DialogTitle id='remove-table-dialog'>Check what table you need remove</DialogTitle>
				<DialogContent>
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

RemoveTabDialog.propTypes = {
	
};

const mapStateToProps = (state) => ({
	data: state.data,
	UI: state.UI
});

export default connect(mapStateToProps, { addTodo })(RemoveTabDialog);
