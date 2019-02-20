import React, {Component} from 'react';
import {connect} from "react-redux";
import {Grid} from "semantic-ui-react";

class Board extends Component{
    componentWillMount() {
        const {ongetBoards} = this.props;
        ongetBoards();
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    render(){
        //const {teams, message} = this.props;

        return (
            <Grid>
                {/*<Message hidden={!Object.keys(message).length} onDismiss={}>*/}
                    {/*<Message.Header>{message.info}</Message.Header>*/}
                {/*</Message>*/}
                {/*<Header>Доски</Header>*/}
                {/*<List celled className={"list-teams"}>*/}
                    {/*{teams.map((team, index) => <List.Item key={`item-${index}`}>*/}
                        {/*<Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />*/}
                        {/*<List.Content>*/}
                            {/*<List.Header>{team.name}</List.Header>*/}
                        {/*</List.Content>*/}
                        {/*<List.Content className={`content-button`}>*/}
                            {/*<Button className={`button-show-team`}>Показать</Button>*/}
                            {/*<Button className={`button-drop-team`} onClick={() => ondropTeam(team.id)}>*/}
                                {/*<Icon name="close"/>*/}
                            {/*</Button>*/}
                        {/*</List.Content>*/}
                    {/*</List.Item>)}*/}
                    {/*<Button className={`button-add`} onClick={() => this.props.history.push('/team/change')}>Создать</Button>*/}
                {/*</List>*/}
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
    })
)(Board);