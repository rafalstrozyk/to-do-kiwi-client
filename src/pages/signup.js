import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import RepeatIcon from '@material-ui/icons/Repeat';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles({
	header: {
		margin: '20px 0'
	},
	flex: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textField: {
		width: '25vw',
		minWidth: '200px'
	},
	margin: {
		margin: '15px 0'
	},
	button: {
		margin: 25
	}
});

const Signup = (props) => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    
    const passwordIsValid = (password, repeatPassword) => {
        if(password.length > 5) {
            console.log('islength')
            if(password === repeatPassword) {
                console.log('isValid')
            } else {
                console.log("isNoValid")
            }
        } else {
            console.log("isNotlength")
        }
    }

    const mailIsValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\(]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(email).toLowerCase())? console.log('isEmail') : console.log("Is not email")
    }

	const handleSubmit = (event) => {
		event.preventDefault();
        passwordIsValid(password, repeatPassword);
        mailIsValid(email)
	};
	return (
		<div className={classes.flex}>
			<Typography variant='h2' className={classes.header}>
				Sign up!!
			</Typography>
			<form className={classes.flex} onSubmit={handleSubmit}>
				<TextField
					required
					id='email'
					className={clsx(classes.textField, classes.margin)}
					label='E-mail'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<AccountCircle color="secondary" />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					required
					id='password'
					className={clsx(classes.textField, classes.margin)}
					type='password'
					label='Password'
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<LockIcon color="secondary" />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					required
					id='repeatPassword'
					className={classes.textField}
					label='repeat Password'
					type='password'
					onChange={(e) => {
						setRepeatPassword(e.target.value);
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<RepeatIcon color="secondary" />
							</InputAdornment>
						)
					}}
				/>
				<Button
					type='submit'
					className={classes.button}
					color='primary'
					variant='contained'
				>
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default Signup;
