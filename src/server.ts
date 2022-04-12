import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import ListResolver from './resolvers/ListResolver'
import TaskResolver from './resolvers/TaskResolver'

export const schema = async () => {
	return await buildSchema({
		resolvers: [ListResolver, TaskResolver],
	})
}

const createServer = async () => {
	return new ApolloServer({
		schema: await schema(),
	})
}

export default createServer
