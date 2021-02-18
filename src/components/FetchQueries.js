import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { fetch_todos } from './Constants';
import Todo from './Todo';

function FetchQueries() {

	const { loading, data } = useQuery(fetch_todos);

	return (
		<>

		{
			loading ? "Loading..."

			:  (data.getTodos.length > 0 ) ? data.getTodos.map(todo => (
				<Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} createdAt={todo.createdAt} />
			))  

			: "No Todos"

		}				
		

		</>
	);

}

export default FetchQueries;




