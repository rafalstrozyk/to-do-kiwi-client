import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '../Card/Card';

const tabels = [
	{
		id: 1,
		label: 'Test1'
	},
	{
		id: 2,
		label: 'Test2'
	},
	{
		id: 3,
		label: 'Test3'
	},
	{
		id: 4,
		label: 'Test4'
	},
	{
		id: 5,
		label: 'Test5'
	},
	{
		id: 6,
		label: 'Test6'
	}
];

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

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`
	};
}

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

export default function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [tabList, setTabList] = useState([{ key: 0, id: 0 }]);
	const [id, setId] = useState(0);

	useEffect(() => {});

	const addTab = () => {
		setTabList(tabels);
		setId = tabList[tabList.length - 1].id + 1;
		tabList.push({
			key: id,
			id: id
		});
		return tabList;
	};

	const CreateTab = ({ tabels }) => (
		<>
			{tabels.map((tabel, index) => (
				<Tab key={index} label={tabel.label} {...a11yProps(index)} />
			))}
		</>
	);

	const CreateTabPanel = ({ tabels }) => (
		<>
			{tabels.map((tabel, index) => (
				<TabPanel key={index} value={index} index={index}>
					{tabel.label}
				</TabPanel>
			))}
		</>
	);

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
					<Tab
						key={tab.id}
						value={index}
						label={'Node ' + tab.id}
					/>
				))}
			</Tabs>
            {tabels.map((tab, index)=> (
                <TabPanel value={value} key={tab.id} index={index}>
				    {tab.label}
			    </TabPanel>
            ))}
		</div>
	);
}
