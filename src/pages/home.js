import React, { useEffect } from 'react';
import MenuBar from '../components/MenuBar/menuBar';
import VerticalTabs from '../components/Tabs/Tabs';
import PropTypoes from 'prop-types';
import { connect } from 'react-redux';
import { loadTabs } from '../redux/actions/dataActions';
import { Redirect } from 'react-router-dom';
import Alerts from '../components/alerts/alerts';

const Home = (props) => {
	const { loadTabs, user } = props;
	useEffect(() => {
		if (user.authenticated) {
			loadTabs(user.userName);
		}
	});

	return (
		<div>
			<Alerts />
			{!user.authenticated && <Redirect to='/login' />}
			<MenuBar />
			<VerticalTabs />
		</div>
	);
};

Home.propTypes = {
	loadTabs: PropTypoes.func.isRequired,
	user: PropTypoes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, { loadTabs })(Home);
