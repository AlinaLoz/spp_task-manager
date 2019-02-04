import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Input, Grid, Message} from "semantic-ui-react";
import {fetchRegister} from "../redux/register/actions";

class Register extends Component {
	state = {
		login: "",
		password: "",
		confirmPassword: "",
	};

	onChange = (type, e) => {
		this.setState({
			[type]: e.target.value
		});
	};

	register = (e) => {
		e.preventDefault();
		const {login, password, confirmPassword} = this.state;
		const {onfetchRegister} = this.props;
		onfetchRegister(login, password, confirmPassword);
	};

	componentWillReceiveProps(nextProps) {
		const {message} = nextProps;
		if (this.props.message !== message && !message.negative) {

			this.props.history.push('/login');
		}
	}

	render() {
		const {login, password} = this.state;
		const {message} = this.props;

		return (
			<Grid className={'page-form register'}>
				<Button className="button__back" onClick={() => this.props.history.push('/')}>back</Button>
				<div>
					<Message hidden={!Object.keys(message).length || !message.negative} content={message.text}/>
					<form>
						<Input type="text" onChange={this.onChange.bind(this, "login")}/>
						<Input type="password" onChange={this.onChange.bind(this, "password")}/>
						<Input type="password" onChange={this.onChange.bind(this, "confirmPassword")}/>
						<Button className="button__login" disabled={!login || !password} onClick={this.register}>register</Button>
					</form>
				</div>
			</Grid>
		)
	}
}

export default connect(
	state => ({
		message: state.register.message || {}
	}),
	dispatch => ({
		onfetchRegister: (login, password, confirmPassword) => dispatch(fetchRegister(login, password, confirmPassword))
	})
)(Register);