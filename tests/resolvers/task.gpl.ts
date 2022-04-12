import { gql } from 'apollo-server'

export const allTasks = gql`
	query Query($options: TaskQueryInput) {
		allTasks(options: $options) {
			id
			listId
			title
			status
			order
			createdAt
			updatedAt
		}
	}
`
export const createTask = gql`
	mutation Mutation($options: TaskCreateInput!) {
		createTask(options: $options) {
			id
			listId
			title
			status
			order
			createdAt
			updatedAt
		}
	}
`

export const updateTask = gql`
	mutation UpdateTask($options: TaskUpdateInput!) {
		updateTask(options: $options) {
			id
			listId
			title
			status
			order
			createdAt
			updatedAt
		}
	}
`

export const reorderTask = gql`
	mutation ReorderTask($options: TaskReorderInput!) {
		reorderTask(options: $options) {
			id
			listId
			title
			status
			order
			createdAt
			updatedAt
		}
	}
`
