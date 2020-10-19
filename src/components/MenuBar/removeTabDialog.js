import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckboxList from './listControl';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { deleteTab, loadTabs } from '../../redux/actions/dataActions';

function RemoveTabDialog(props) {
	const [open, setOpen] = useState(false);
	const { deleteTab, loadTabs, user, UI, data } = props;

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
		deleteTab(UI.radioTab);
		loadTabs(user.userName);
		setOpen(false);
	};

	return (
		<div>
			<Typography variant='body1' onClick={handleClickOpen} component='p'>
				Remove Table
			</Typography>
			<Dialog onClose={handleClose} aria-labelledby='remove-table' open={open}>
				{data.tabels.length > 0 ? (
					<>
						<DialogTitle id='remove-table-dialog'>
							Check what table you need remove
						</DialogTitle>
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
					</>
				) : (
					<>
						<DialogTitle id='remove-table-dialog'>
							You dont have any tabels to remove
						</DialogTitle>
						<DialogActions>
							<Button onClick={handleClose} color='primary'>
								Cancel
							</Button>
						</DialogActions>
					</>
				)}
			</Dialog>
		</div>
	);
}

RemoveTabDialog.propTypes = {
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	deleteTab: PropTypes.func.isRequired,
	loadTabs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
	data: state.data
});

export default connect(mapStateToProps, { deleteTab, loadTabs })(
	RemoveTabDialog
);
