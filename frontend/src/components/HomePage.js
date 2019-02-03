import React from 'react';
import {Route} from "react-router-dom";
import Login from "./Login";

export const HomePage = () => (
	<React.Fragment>
		<Route to={'/'} component={Login}/>
	</React.Fragment>
);



