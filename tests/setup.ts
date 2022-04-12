import { ApolloServer } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { schema } from '../src/server'

export const testClient = async () => {
	return createTestClient(
		new ApolloServer({
			schema: await schema(),
		})
	)
}
