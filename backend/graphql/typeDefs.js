const { gql } = require('apollo-server');

module.exports = gql`

	type Todo {
		id:ID!,
		title:String!,
		completed:Boolean!,
		createdAt:String!,
		updatedAt:String!
	}


	type Query {
		getTodos:[Todo]
	}

	input TodoDetail {
		title:String!,
		completed:Boolean!
	}

	input SendTodoDetail { 
		id:ID!, 
		title:String, 
		completed:Boolean 
	}

	input SendId {
		id:ID!,
	}

	type Mutation {
		addTodo(todoDetail:TodoDetail): Todo!,

		editTodo(todoDetail: SendTodoDetail): Todo!,

		deleteTodo(sendId: SendId):Todo
	}
`