import React, {Component} from 'react';
import {Grid, Segment, Sidebar} from "semantic-ui-react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {Link} from "react-router-dom";

export const Board = ({children}) => {
	return (
		<Grid className={'page-form login'}>
			<Sidebar>
				<Segment basic>
					<Header as='h3'><Link to={'/tasks'}>Tasks</Link></Header>
				</Segment>
			</Sidebar>
			{children}
		</Grid>
	)
};
