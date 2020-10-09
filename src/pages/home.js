import React, { useEffect } from 'react';
import MenuBar from '../components/MenuBar/menuBar';
import VerticalTabs from '../components/Tabs/Tabs';
import PropTypoes from 'prop-types';
import { connect } from 'react-redux';
import { loadTabs } from '../redux/actions/dataActions';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
	const { loadTabs, user } = props;
	useEffect(() => {
		if (user.authenticated) {
			loadTabs();
		}
	});

	return (
		<div>
			{!user.authenticated && <Redirect to='/login' />}
			<MenuBar />
			<VerticalTabs />
		</div>
	);
};

Home.propTypes = {
	loadTabs: PropTypoes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, { loadTabs })(Home);
