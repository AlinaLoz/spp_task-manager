import React, {Component} from 'react';
import {connect} from "react-redux";

class ListBoards extends Component{
    render(){
        return (
            <div>boards</div>
        )
    }
}


export default connect(
    state => ({}),
    dispatch => ({})
)(ListBoards);