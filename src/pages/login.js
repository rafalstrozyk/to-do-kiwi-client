import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
	form: theme.form,
	pageTitle: theme.pageTitle,
	textField: theme.textField,
	button: theme.button
	
});

const Login = (props) => {

	const {email, setEmail} = useState('');
	const {password, setPassword} = useState('');
	const {errors, setErrors} = useState({});

	const {classes} = props;

	return (
		<Grid container className={classes.form}>
			<Grid item sm>
				<Typography variant='h2' className={classes.pageTitle}>Login</Typography>
				<form noValidate>
					<TextField
					className={classes.textField}
						id='email'
						name='email'
						type='email'
						label='Email'
						value={email}
						onChange={setEmail}
						fullWidth
					/>
					<TextField
					className={classes.textField}
						id='password'
						name='password'
						type='password'
						label='Password'
						value={password}
						onChange={setPassword}
						fullWidth
					/>
					<Button type='submit' variant='contained' className={classes.button} color='secondary'>
						Login
					</Button>
					<br />
					<small>
						don't have an account? Sign up <Link to='/signup'>here</Link>
					</small>
				</form>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Login);
