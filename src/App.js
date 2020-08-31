import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';

// components
import Navbar from './components/layout/Navbar';

// pages
import Home from './pages/home';
import Login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west1-todokiwi.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

const App = () => {
	return (
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	);
};

export default App;
