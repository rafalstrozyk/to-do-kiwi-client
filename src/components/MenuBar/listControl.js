import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));

function CheckboxList(props) {
	const tabels = props.data.tabels;

	const classes = useStyles();
	const [checked, setChecked] = React.useState([0]);
	const [value, setValue] = React.useState(tabels[0].id);

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
					const labelId = `checkbox-list-label-${index}`;

					return (
						<ListItem
							key={tabel.id}
							role={undefined}
							dense
							button
							onClick={handleToggle(tabel.id)}
						>
							{/* <ListItemIcon>
								<Checkbox
									edge='start'
									checked={checked.indexOf(tabel.id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
                                
							</ListItemIcon> */}
							{/* <FormControlLabel  value={tabel.id} control={<Radio />} label={tabel.label} /> */}
							<Radio
								checked={value === tabel.id}
								onChange={handleChange}
								value={tabel.id}
								name='radio-button-demo'
								inputProps={{ 'aria-label': `${tabel.id}` }}
							/>

							<ListItemText id={labelId} primary={`${tabel.label}`} />
						</ListItem>
					);
				})}
			</RadioGroup>
		</List>
	);
}

CheckboxList.propTypes = {
	data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps)(CheckboxList);
