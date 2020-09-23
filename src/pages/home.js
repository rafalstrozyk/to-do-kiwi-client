import React, {useEffect} from 'react';
import MenuBar from '../components/MenuBar/menuBar'
import VerticalTabs from '../components/Tabs/Tabs';
import PropTypoes from 'prop-types';
import {connect} from 'react-redux';
import {loadTabs} from '../redux/actions/dataActions';

const Home = (props) => {
	const {loadTabs} = props;
	useEffect(() => {
		loadTabs();
	})

	return (
		<div>
			<MenuBar />
			<VerticalTabs/>
		</div>
		
	);
};

Home.propTypes = {
	loadTabs: PropTypoes.func.isRequired,
}

export default  connect(null, {loadTabs})(Home);