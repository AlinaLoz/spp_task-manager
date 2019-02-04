import React from 'react';
import {Icon, Segment, Sidebar, Menu} from "semantic-ui-react";
import {withRouter} from "react-router-dom";

const BoardComponent = ({children, history}) => {
	return (
		<section className={'page-tasks'}>
			<Sidebar visible className={'page-tasks__sidebar'}>
				<Segment basic>
					<Menu.Item as='a' onClick={() => history.push('/tasks')}>
						<Icon name='tasks'/>
						<span>Tasks</span>
					</Menu.Item>
				</Segment>
			</Sidebar>
			{children}
		</section>
	)
};


export const Board = withRouter(BoardComponent);