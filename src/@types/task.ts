import { Status } from './../enums/task'

export type Task = {
	id: number
	listId: number
	title: string
	status: Status
	order: number
	createdAt: Date
	updatedAt: Date
}
