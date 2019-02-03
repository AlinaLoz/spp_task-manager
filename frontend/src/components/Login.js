import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchLogin} from "../redux/actions";
import {Button, Input} from "semantic-ui-react";



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

	render() {
		const {login, password} = this.state;

		return (
			<form>
				<Input type="text" onChange={this.onChange.bind(this, "login")}/>
				<Input type="password" onChange={this.onChange.bind(this, "password")}/>
				<Button disabled={!login || !password} onClick={this.logIn}>login</Button>
			</form>
		)
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		onfetchLogin: (login, password) => dispatch(fetchLogin(login, password))
	})
)(Login);