import React, {Component} from 'react';
import {connect} from "react-redux";
import {Navbar} from "./Sidebar";
import {Accordion, Button, Header, Icon, Input, Label, Message, TextArea} from "semantic-ui-react";
import {addTask, changeTask, deleteTask, getTasks, removeMessage} from "../redux/tasks/actions";

class TaskComponent extends Component {
	state = {
		theme: "",
		text: ""
	};

	render() {
		const {onaddTasks} = this.props;
		const {theme, text} = this.state;

		return(
			<section className="task-add">
				<Label>theme</Label>
				<Input  onChange={(e) => this.setState({theme: e.target.value})} value={theme}/>
				<TextArea onChange={(e) => this.setState({text: e.target.value})} value={text}/>
				<Button onClick={() => onaddTasks(theme, text)}>save</Button>
			</section>
		)
	}
}

const Task = connect(
	state => ({}),
	dispatch => ({
		onaddTasks: (theme, text) => dispatch(addTask(theme, text))
	})
)(TaskComponent);


class TaskItemComponent extends Component {
	state = {
		activeIndex: false,
		value:  this.props.task.text
	};

	render() {
		const {task, ondeleteTask, onchangeTask} = this.props;
		const {activeIndex, value} = this.state;

		console.log(task.id, value);

		return (
			<Accordion styled>
				<Accordion.Title>
					<span>{task.theme}</span>
					<Icon name="edit" onClick={() => this.setState({activeIndex: !activeIndex})}/>
					<Icon name="close" onClick={() => ondeleteTask(task.id)}/>
				</Accordion.Title>
				<Accordion.Content active={activeIndex}>
					<TextArea onChange={(e) => this.setState({value: e.target.value})} value={value}/>
					<Icon name="save" onClick={() => onchangeTask(task.id, value)} />
				</Accordion.Content>
			</Accordion>
		)
	}
}

const TaskItem = connect(
	state => ({}),
	dispatch => ({
		ondeleteTask: (id) => dispatch(deleteTask(id)),
		onchangeTask: (taskId, value) => dispatch(changeTask(taskId, value)),
	})
)(TaskItemComponent);



class Tasks extends Component {
	state = {
		addTask: false
	};

	componentWillMount() {
		const {ongetTasks} = this.props;
		ongetTasks();
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const {ongetTasks} = this.props;
		const {message} = nextProps;
		if (message !== this.props.message) {
			ongetTasks();
		}
	}

	render() {
		const {tasks, message, onremoveMessage} = this.props;
		const {addTask} = this.state;

		return (
			<Navbar>
				<section  className="content">
					<Header className="content__header">Tasks</Header>
					<Message hidden={!Object.keys(message).length} content={message.text || "changing save"}  onDismiss={() => onremoveMessage()}/>
					<Button className="button-add" onClick={() => this.setState({addTask: !addTask})}>add task</Button>
					{tasks.map(task => <TaskItem key={task.id} task={task}/> )}
				</section>
				{addTask && <Task/>}
			</Navbar>
		)
	}
}

export default connect(
	state => ({
		tasks: state.tasks.tasks || [],
		message: state.tasks.message || {}
	}),
	dispatch => ({
		ongetTasks: () => dispatch(getTasks()),
		onremoveMessage: () => dispatch(removeMessage())
	})
)(Tasks);