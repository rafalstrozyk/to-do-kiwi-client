import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser } from './redux/actions/userActions';

// components
import Navbar from './components/layout/Navbar';

// pages
import Home from './pages/home';
import Login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west1-todokiwi.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
	}
}

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<Navbar />
					<main className='container'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/signup' component={signup} />
						</Switch>
					</main>
				</Router>
			</Provider>
		</ThemeProvider>
	);
};

export default App;
