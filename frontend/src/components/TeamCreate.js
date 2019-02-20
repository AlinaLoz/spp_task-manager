import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Checkbox, Form, Grid, Header, Icon, Input, Label, List, Loader, Message} from "semantic-ui-react";
import {checkExistUser, createTeam, dropMessage} from "../redux/teams/actions";

class TeamChangeComponent extends Component {
    state = {
        addUser: "",
        sendCheckUser: "",
        name: "",
        members: []
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {userTest} = nextProps;
        const {members} = this.state;

        if (userTest !== this.props.userTest && userTest) {
            members.push({...userTest, checked: false});
            this.setState({
                members: [...members]
            });
        }
    }

    changeCheckedMembers = (index) => {
        const {members} = this.state;
        members[index].checked = !members[index].checked;
        this.setState({
            members: [...members]
        });
    };

    saveTeam = () => {
        const {onCreateTeam} = this.props;
        const {name, members} = this.state;

        const sortmembers = members.filter(member => member.checked).map(member => member.id);
        onCreateTeam(name, sortmembers)
    };

    render() {
        const {addUser, sendCheckUser, members} = this.state;
        const {userTest, fetchingUserTest, message, fetchCreateTeam} = this.props;
        const {oncheckUser, ondropMessage} = this.props;

        return (
            <Grid className={"grid-change-team"}>
                {fetchCreateTeam && <Loader/>}
                {!fetchCreateTeam &&
                    <Message hidden={!Object.keys(message).length} onDismiss={ondropMessage}>
                        <Message.Header>{message.info}</Message.Header>
                    </Message>}
                <Header>Создать команду</Header>
                <Form>
                    <Input className={`input-name`}>
                        <Label>Название:</Label>
                        <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
                    </Input>
                    <Input className={`input-new-user`}>
                        <Label>Добавить участника:</Label>
                        <input type="text" onChange={(e) => this.setState({addUser: e.target.value})} />
                        <div>
                            {addUser !== sendCheckUser ?
                                <Icon name="question" onClick={() => {this.setState({sendCheckUser: addUser}); oncheckUser(addUser);}}/>
                                :
                                <React.Fragment>
                                    {userTest != null && userTest !== false && <Icon name="check" />}
                                    {userTest === false && <Icon name="warning" />}
                                </React.Fragment>
                            }
                            {fetchingUserTest && <Loader/>}
                        </div>
                    </Input>
                    <List className={`members`}>
                        {members.map((member, index) =>
                            <List.Item key={`member-${index}`}>
                                <Checkbox onChange={() => this.changeCheckedMembers(index)}/>
                                <List.Content>{member.login}</List.Content>
                            </List.Item>
                        )}
                    </List>
                    <Button className={`button-save`} onClick={this.saveTeam}>Сохранить</Button>
                </Form>
            </Grid>
        )
    }
}

export const TeamCreate = connect(
    state => ({
        userTest        : state.teams.userTest,
        fetchingUserTest: state.teams.fetchingUserTest,
        message         : state.teams.messageOfCreate,
        fetchCreateTeam : state.teams.fetchCreateTeam,
    }),
    dispatch => ({
        oncheckUser  : (login) => dispatch(checkExistUser(login)),
        onCreateTeam : (name, users) => dispatch(createTeam(name, users)),
        ondropMessage: () => dispatch(dropMessage())
    })
)(TeamChangeComponent);