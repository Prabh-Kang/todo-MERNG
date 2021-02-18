import React from 'react'
import './css/Main.css';

import FetchQueries from './FetchQueries';

import AddTodo from './AddTodo';




function Main() {

	return (
		<div className="mainDiv">
			<h1>Todo App</h1>

			<AddTodo />

			<FetchQueries />	
		
		</div>
	);
}

export default Main;
		