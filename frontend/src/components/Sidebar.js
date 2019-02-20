import React from 'react';
import {Icon, Segment, Sidebar, Menu} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logOut} from "../redux/auth/actions";

const NavbarComponent = ({history, onlogOut}) => {
	return (
		<Sidebar visible className={'page-tasks__sidebar navbar'}>
			<Segment basic>
				<Menu.Item as={'a'} onClick={() => history.push('/')}>
					{/*<ReactSVG src={require('../assets/images/logo.svg')}/>*/}
					<span>Tododer</span>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/profile')}>
					<Icon name='user'/>
					<span>Профиль</span>
					<Icon name={`log out`} onClick={() => onlogOut()}/>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/team')}>
					<Icon name='group'/>
					<span>Команды</span>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/boards')}>
					<Icon name='clipboard'/>
					<span>Доски</span>
				</Menu.Item>
			</Segment>
		</Sidebar>
	)
};


export default withRouter(connect(
	state => ({}),
	dispatch => ({
		onlogOut: () => dispatch(logOut())
	}),
)(NavbarComponent));