const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv/config');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const MONGODB = process.env.MONGODB;
const Port = process.env.PORT;





const server = new ApolloServer({
	typeDefs,
	resolvers,
})


mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
	console.log('Connected to the database.');
	server.listen(Port, () => {
		console.log(`Server is open at port ${Port}`);
	})
})
.catch((error) => {
	console.log(error);
})