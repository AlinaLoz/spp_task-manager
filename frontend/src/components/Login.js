import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Input, Grid, Message, Icon} from "semantic-ui-react";
import {fetchLogin} from "../redux/auth/actions";

class Login extends Component {
	state = {
		login: "",
		password: ""
	};

	onChange = (type, e) => {
		this.setState({
			[type]: e.target.value
		});
	};


	logIn = (e) => {
		e.preventDefault();
		const {login, password} = this.state;
		const {onfetchLogin} = this.props;
		onfetchLogin(login, password);
	};

	componentWillReceiveProps(nextProps) {
		const {message} = nextProps;
		if (this.props.message !== message && !message.negative) {

			this.props.history.push('/');
		}
	}

	render() {
		const {login, password} = this.state;
		const {message} = this.props;

		return (
			<Grid className={'page-form auth'}>
				<Button className={'button-register'} onClick={() => this.props.history.push('/register')}>register</Button>
				<div>
					<Message hidden={!Object.keys(message).length || !message.negative} content={message.text}/>
					<form>
						<Input type="text" onChange={this.onChange.bind(this, "login")}>
							<Icon name="user"/>
							<input type="text"/>
						</Input>
						<Input type="password" onChange={this.onChange.bind(this, "password")}>
							<Icon name="lock"/>
							<input type="password"/>
						</Input>
						<Button className="button__login" disabled={!login || !password} onClick={this.logIn}>login</Button>
					</form>
				</div>
			</Grid>
		)
	}
}

export default connect(
		state => ({
			message: state.auth.message || {}
		}),
		dispatch => ({
			onfetchLogin: (login, password) => dispatch(fetchLogin(login, password))
		})
)(Login);