import React, { useState } from 'react';
import { Link} from 'react-router-dom';

// MUI stuf
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from "@material-ui/core/Typography";
import makeStyle from '@material-ui/core/styles/makeStyles';

import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userActions';


const Navbar = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const {logoutUser, user} = props;

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logoutUser();

	}
	return (
		<AppBar color='primary'>
			<Toolbar className='nav-contener'>
				{user.authenticated? (
					<>
						<Button color='inherit' onClick={handleLogout} >
							Logout
						</Button>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
						<Typography variant="body1" >{`${user.userName}`}</Typography>

						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
						</Menu>
					</>
				) : (
					<>
						<Button color='inherit' component={Link} to='/login'>
							Login
						</Button>

						<Button color='inherit' component={Link} to='/signup'>
							Signup
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = state =>({
	user: state.user
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
