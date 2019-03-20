import React, {Component} from 'react';
import {connect} from "react-redux";
import {dropMessage, getOneTeam, updateName} from "../redux/teams/actions";
import {Button, Grid, Header, Input, List, Message} from "semantic-ui-react";

class TeamChange extends Component {
    state = {
        name: ""
    };

    componentWillMount() {
        const {ongetOneTeam, match} = this.props;
        ongetOneTeam(match.params.id);
    }

    render() {
        const {ondropMessage, onupdateName} = this.props;
        const {message, team} = this.props;

        return (
            <Grid className={`team-change`}>
                <Message hidden={!Object.keys(message).length} onDismiss={ondropMessage}>
                    <Message.Header>{message.info}</Message.Header>
                </Message>
                <Header>{team && team.name}</Header>
                <label>изменить название тимы</label>
                <Input  onChange={(e) => this.setState({name:e.target.value})}/>
                <Header>Участники:</Header>
                <List>
                    {team && team.users.map((user, index) => <List.Item key={index}>{user.login}</List.Item>)}
                </List>
                <Button className={`button-save`} onClick={() => onupdateName(team.id, this.state.name)}>Сохранить</Button>
            </Grid>
        )
    }
}

export default connect(
    (state, props) => ({
        team     : state.teams.infoTeams[props.match.params.id],
        message  : state.teams.messageOfCreate,
    }),
    dispatch => ({
        ongetOneTeam: (id) => dispatch(getOneTeam(id)),
        ondropMessage: () => dispatch(dropMessage()),
        onupdateName: (id, name) => dispatch(updateName(id, name)),
    })
)(TeamChange);