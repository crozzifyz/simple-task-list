import { gql } from 'apollo-server'

export const allLists = gql`
	query Query($options: ListQueryInput) {
		allLists(options: $options) {
			id
			title
			createdAt
			updatedAt
			tasks {
				id
				listId
				title
				status
				order
				createdAt
				updatedAt
			}
		}
	}
`
export const createList = gql`
	mutation CreateList($options: ListCreateInput!) {
		createList(options: $options) {
			id
			title
			createdAt
			updatedAt
			tasks {
				id
				listId
				title
				status
				order
				createdAt
				updatedAt
			}
		}
	}
`
