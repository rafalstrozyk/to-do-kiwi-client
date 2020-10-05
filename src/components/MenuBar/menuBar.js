import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import AddTodoDialog from './addTodoDialog';
import AddTabDialog from './addTabDialog';

// Material-UI stuff
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5'
	}
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center'
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white
			}
		}
	}
}))(MenuItem);

function MenuBar(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openTodoDialog, setOpenTodoDialog] = useState(false);
	const [openTabDialog, setOpenTabDialog] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClickOpen = (e) => {
		if(document.getElementById('addTodoDialog') === e.target) {
			setOpenTodoDialog(true);
		}
		if(document.getElementById('addTabDialog') === e.target) {
			setOpenTabDialog(true);
		}
	}

	const handleClose = () => {
		setAnchorEl(null);
	};


	return (
		<>
			<Button
				aria-controls='customized-menu'
				aria-haspopup='true'
				variant='contained'
				color='primary'
				onClick={handleClick}
			>
				Open Menu
			</Button>
			<StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem onClick={handleClickOpen}>
					<ListItemIcon>
						<AddCircleIcon fontSize='small' />
					</ListItemIcon>
					<AddTodoDialog id="addTodoDialog" open={openTodoDialog} />
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemIcon>
						<AddCircleIcon fontSize='small' />
					</ListItemIcon>
					<AddTabDialog id="addTabDialog" open={openTabDialog} />
				</StyledMenuItem>
			</StyledMenu>
		</>
	);
}

export default MenuBar
