import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { loadUser } from './redux/actions/userActions';

// components
import Navbar from './components/layout/Navbar';

// pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const theme = createMuiTheme(themeFile);

const App = (props) => {
	const { loadUser} = props;

	useEffect(() => {
		loadUser();
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navbar />
				<main className='container'>
					{localStorage.getItem('userName') ? (
						<Redirect to='/' />
					) : (
						<Redirect to='/login' />
					)}
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/signup' component={Signup} />
					</Switch>
				</main>
			</Router>
		</ThemeProvider>
	);
};

export default connect(null, { loadUser})(App);
