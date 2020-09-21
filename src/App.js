import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// redux
import { Provider } from 'react-redux';
import store from './redux/store';


// components
import Navbar from './components/layout/Navbar';

// pages
import Home from './pages/home';
import Login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

const App = () => {
	// db.collection('test').add({
	// 	first: 'test2',
	// 	age: 5,
	// 	last: 'potato2'
	// })
	// .then(doc => {
	// 	console.log("lol")
	// 	console.log(doc.id)
	// })
	// .catch(err => {
	// 	console.error(err);
	// })

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
