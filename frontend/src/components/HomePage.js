import React from 'react';
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Tasks from "./Tasks";

export const HomePage = () => (
	<React.Fragment>
		<Route path='/register' component={Register}/>
		<Switch>
			{!localStorage.getItem('auth') && <Route component={Login}/>}
			<Route exact path={'/'} component={Tasks}/>
			<Route component={Tasks}/>
		</Switch>
	</React.Fragment>
);




