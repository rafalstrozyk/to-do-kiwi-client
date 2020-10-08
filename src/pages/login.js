import React, { useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { useHistory } from 'react-router-dom';

const styles = (theme) => ({
	form: theme.form,
	pageTitle: theme.pageTitle,
	textField: theme.textField,
	button: theme.button
});

const Login = (props) => {
	const [ userName, setUserName ] = useState('');
	const [ errors, setErrors ] = useState({});
	let history = useHistory();
	const loginUser = props.loginUser;

	if(props.UI.errors) {
		setErrors(props.UI.errors);
	}

	const {
		classes,
		UI: { loading }
	} = props;

	function handleSubmit(event) {
		
		console.log("lolk")
		event.preventDefault();
		loginUser(userName);
	}

	return (
		<Grid container className={classes.form}>
			<Grid item sm>
				<Typography variant='h2' className={classes.pageTitle}>
					Login
				</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						className={classes.textField}
						id='userName'
						name='userName'
						type='text'
						label='User Name'
						required
						value={userName}
						onChange={e => setUserName(e.target.value)}
						fullWidth
					/>
					{errors.general && (
						<Typography variant='body2' className={classes.customError}>
							{errors.general}
						</Typography>
					)}
					<Button
						type='submit'
						variant='contained'
						className={classes.button}
						color='secondary'
					>
						{loading && (
							<CircularProgress
								className={classes.progress}
								size={30}
								color='secondary'
							/>
						)}
						Login
					</Button>
				</form>
			</Grid>
		</Grid>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Login));
