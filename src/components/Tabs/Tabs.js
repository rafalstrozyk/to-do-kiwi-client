import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

import { loadTabs } from '../../redux/actions/dataActions';

function TabPanel(props) {
	const { children, value, index, boxClass, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box className={boxClass}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: '100%'
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`
	},
	box: {
		maxWidth: '100%',
		maxHeight: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignContent: 'space-beetween'
	},
	panel: {
		maxWidth: '80%'
	}
}));

function VerticalTabs(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const {loadTabs} = props;

	const tabels = props.data.tabels;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				orientation='vertical'
				variant='scrollable'
				value={value}
				onChange={handleChange}
				aria-label='Vertical tabs example'
				className={classes.tabs}
			>
				{tabels.map((tab, index) => (
					<Tab key={tab.id} value={index} label={tab.label} />
				))}
			</Tabs>
			{tabels.map((tab, index) => (
				<TabPanel value={value} key={tab.id} index={index}>
					{tab.label}
				</TabPanel>
			))}
		</div>
	);
}

VerticalTabs.propTypes = {
	data: PropTypes.object.isRequired,
	loadTabs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { loadTabs })(VerticalTabs);
