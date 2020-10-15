import React from 'react';
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const Alerts = (props) => {
    const {UI} = props;
    return (
        
        <div>
            {UI.alert ? <Alert severity={UI.severity} >{UI.info}</Alert>: null}  
        </div>
    )
}

Alerts.propTypes = {
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	UI: state.UI
});

export default connect(mapStateToProps)(Alerts);