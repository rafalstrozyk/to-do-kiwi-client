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
	const [open, setOpen] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClickOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setAnchorEl(null);
	};


	return (
		<div>
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
					<AddTodoDialog open={open} />
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemIcon>
						<AddCircleIcon fontSize='small' />
					</ListItemIcon>
					{/* <ListItemText onClick={handleAddTab} primary='Add column' /> */}
					<AddTabDialog open={open} />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}

export default MenuBar
