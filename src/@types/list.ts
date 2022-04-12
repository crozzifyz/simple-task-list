import { Task } from './task'

export type List = {
	id: number
	title: string
	createdAt: Date
	updatedAt: Date
}

export type ListWithTasks = List & {
	tasks: Task[]
}
