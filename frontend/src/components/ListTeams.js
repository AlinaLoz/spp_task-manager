import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Grid, Header, Icon, Image, List, Message} from "semantic-ui-react";
import {dropMessage, dropTeam, getTeams} from "../redux/teams/actions";

class ListTeams extends Component{
    componentWillMount() {
        const {ongetTeams} = this.props;
        ongetTeams();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {message} = nextProps;
        if (message !== this.props.message) {

        }
    }

    render(){
        const {teams,message} = this.props;
        const {ondropTeam, ondropMessage} = this.props;

        return (
            <Grid>
                <Message hidden={!Object.keys(message).length} onDismiss={ondropMessage}>
                    <Message.Header>{message.info}</Message.Header>
                </Message>
                <Header>Команды</Header>
                <List celled className={"list-teams"}>
                    {teams.map((team, index) => <List.Item key={`item-${index}`}>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                        <List.Content>
                            <List.Header>{team.name}</List.Header>
                        </List.Content>
                        <List.Content className={`content-button`}>
                            <Button className={`button-show-team`} onClick={() => this.props.history.push(`/team/${team.id}`)}>Показать</Button>
                            <Button className={`button-drop-team`} onClick={() => ondropTeam(team.id)}>
                                <Icon name="close"/>
                            </Button>
                        </List.Content>
                    </List.Item>)}
                    <Button className={`button-add`} onClick={() => this.props.history.push('/team/change')}>Создать</Button>
                </List>
            </Grid>
        )
    }
}


export default connect(
    state => ({
        teams  : state.teams.teams,
        message: state.teams.messageOfDrop
    }),
    dispatch => ({
        ongetTeams: () => dispatch(getTeams()),
        ondropTeam: (id) => dispatch(dropTeam(id)),
        ondropMessage: () => dispatch(dropMessage())
    })
)(ListTeams);