import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// redux
import { connect } from 'react-redux';
import { changeTabRadio } from '../../redux/actions/uiActions';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));

function CheckboxList(props) {
	const tabels = props.data.tabels;
	const changeTabRadio = props.changeTabRadio;
	const classes = useStyles();
	const [checked, setChecked] = useState([0]);
	const [value, setValue] = useState(tabels[0].id);

	useEffect(() => {
		changeTabRadio(value);
	});

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List className={classes.root}>
			<RadioGroup
				aria-label='tabels'
				name='tabels1'
				value={value}
				onChange={handleChange}
			>
				{tabels.map((tabel) => {
					return (
						<ListItem key={tabel.id} onClick={handleToggle(tabel.id)}>
							<FormControlLabel
								checked={value === tabel.id}
								onChange={handleChange}
								value={tabel.id}
								control={<Radio />}
								label={`${tabel.label}`}
							/>
						</ListItem>
					);
				})}
			</RadioGroup>
		</List>
	);
}

CheckboxList.propTypes = {
	changeTabRadio: PropTypes.func.isRequired,
	tabels: PropTypes.array.isRequired
};

CheckboxList.defaultProps = {
	tabels: [],
}

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { changeTabRadio })(CheckboxList);
