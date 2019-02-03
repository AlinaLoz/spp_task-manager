import React, {Component} from 'react';
import {connect} from "react-redux";
import {Board} from "./Board";

class Tasks extends Component {
	render() {
		return (
			<Board>
				<div>fdsfsdfdsfsd</div>
			</Board>
		)
	}
}

export default connect(
	state => ({
	}),
	dispatch => ({
	})
)(Tasks);