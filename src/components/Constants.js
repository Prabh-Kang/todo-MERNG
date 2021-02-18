import gql from 'graphql-tag';

export const fetch_todos = gql`
	{ 
		getTodos {
			id
			title
			completed
			createdAt
		}
	}
	`
export const add_todo = gql`
		mutation addTodo($title:String!, $completed:Boolean!) {
			addTodo(todoDetail:{title:$title, completed:$completed}) {
				id title completed
			}
		}
	`

export const delete_todo = gql`

	mutation deleteTodo($id:ID!) {
		deleteTodo( sendId: { id:$id } ) {
			title
		}
	}

`

export const edit_todo = gql`

	mutation editTodo($id:ID!, $title:String!, $completed:Boolean!) {
		editTodo( todoDetail: { id:$id, title:$title, completed:$completed } ) {
			id
			title
			completed
		}
	}

`
