import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { changeTabRadio } from '../../redux/actions/uiActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
				{tabels.map((tabel, index) => {
					const tabelId = `radio-list-label-${index}`;

					return (
						// <ListItem
						// 	key={tabel.id}
						// 	role={undefined}
						// 	dense
						// 	button
						// 	onClick={handleToggle(tabel.id)}
						// >
						// 	<Radio
						// 		checked={value === tabel.id}
						// 		onChange={handleChange}
						// 		value={tabel.id}
						// 		name='radio-button-demo'
						// 		inputProps={{ 'aria-label': `${tabel.id}` }}

						// 	/>
						// 	<ListItemText id={tabelId} primary={`${tabel.label}`} />

						// </ListItem>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Tabel</FormLabel>
							<RadioGroup
								aria-label='tabel'
								name='tabel1'
								value={value}
								onChange={handleChange}
							>
								<FormControlLabel
									value='female'
									control={<Radio />}
									label='Female'
								/>
								<FormControlLabel
									value='male'
									control={<Radio />}
									label='Male'
								/>
								<FormControlLabel
									value='other'
									control={<Radio />}
									label='Other'
								/>
								<FormControlLabel
									value='disabled'
									disabled
									control={<Radio />}
									label='(Disabled option)'
								/>
							</RadioGroup>
						</FormControl>
					);
				})}
			</RadioGroup>
		</List>
	);
}

CheckboxList.propTypes = {
	data: PropTypes.object.isRequired,
	changeTabRadio: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { changeTabRadio })(CheckboxList);
