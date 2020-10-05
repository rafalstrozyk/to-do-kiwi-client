import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';

const useStyles = makeStyles({
	flex: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        width: '25vw',
        minWidth: '200px'
    },
    margin: {
        margin: "15px 0"
    }
});

const Signup = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.flex}>
			<Typography variant='h2'>Signup!!</Typography>
			<form className={classes.flex}>
				<TextField
					required
                    id='userName'
                    className={clsx(classes.textField, classes.margin)}
					label='User Name'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<AccountCircle />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					required
                    id='password'
                    className={clsx(classes.textField, classes.margin)}
					label='Password'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<AccountCircle />
							</InputAdornment>
						)
					}}
				/>
                <TextField
					required
                    id='requiredPassword'
                    className={classes.textField}
					label='Require Password'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<AccountCircle />
							</InputAdornment>
						)
					}}
				/>
			</form>
		</div>
	);
};

export default Signup;
