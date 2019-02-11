import React, { Component } from 'react';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";
import HomePage from "./components/HomePage";

const store = createStore(reducer, {}, applyMiddleware(thunk));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<HomePage/>
				</Router>
			</Provider>
	);
	}
}

export default App;