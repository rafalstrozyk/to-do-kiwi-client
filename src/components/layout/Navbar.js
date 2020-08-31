import React from 'react';
import { Link } from 'react-router-dom';

// MUI stuf
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = (props) => {
	return (
		<AppBar color='primary'>
			<Toolbar className='nav-contener'>
				<Button color='inherit' component={Link} to='/login'>
					Login
				</Button>
				<Button color='inherit' component={Link} to='/'>
					Home
				</Button>
				<Button color='inherit' component={Link} to='/signup'>
					Signup
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;