import React from 'react';
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Tasks from "./Tasks";
import {connect} from "react-redux";

const HomePage = ({auth}) =>  {
	return (
		<React.Fragment>
			<Route path='/register' component={Register}/>
			<Switch>
				{!auth && <Route component={Login}/>}
				<Route exact path={'/'} component={Tasks}/>
			</Switch>
		</React.Fragment>
	)
};

export default connect(
	state => ({
		auth: state.auth.auth
	}),
	dispatch => ({})
)(HomePage);


