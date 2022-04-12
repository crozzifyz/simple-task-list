import { Task } from './../@types/task'
import { TaskRepo } from '../repositories/task'
import { ListService } from './list'
import { ApolloError } from 'apollo-server-core'
import { Db } from '../repositories/db'
import { Status } from '../enums/task'

export namespace TaskService {
	export const getAll = TaskRepo.findAll

	export const getById = async (id: number): Promise<Task> => {
		const task = await TaskRepo.findOne({ id })
		if (!task) {
			throw new ApolloError(`Task not found for id ${id}`)
		}

		return task
	}

	export const create = async (input: Pick<Task, 'listId' | 'title'>): Promise<Task> => {
		const list = await ListService.getById(input.listId, true)
		const existingTasks = await getAll({ listId: list.id })
		const createdTask = await TaskRepo.insert({
			title: input.title,
			listId: list.id,
			status: Status.TODO,
			order: existingTasks.length + 1,
		})
		if (Db.isErrorDuplicate(createdTask)) {
			throw new ApolloError('Duplicated data')
		}
		if (Db.isErrorUniqueConstraint(createdTask)) {
			throw new ApolloError('Violates unique constraint')
		}

		return createdTask
	}

	export const update = async (input: Pick<Task, 'id' | 'title' | 'status'>): Promise<Task> => {
		const updatedTask = await TaskRepo.update(input.id, { title: input.title, status: input.status })
		if (!updatedTask) {
			throw new ApolloError(`Task not found for id ${input.id}`)
		}

		return updatedTask
	}

	export const reorder = async (input: Pick<Task, 'id' | 'order'>): Promise<Task[]> => {
		const task = await getById(input.id)
		const existingTasks = await getAll({ listId: task.listId })

		const max = existingTasks.length
		if (input.order < 1 || input.order > max) {
			throw new ApolloError(`New position ${input.order} is out of bound, min: 1, max: ${max}`)
		}

		// remove task from current position
		existingTasks.splice(task.order - 1, 1)

		// push task to new position
		existingTasks.splice(input.order - 1, 0, task)

		const reorderedTasks = existingTasks.slice()
		const promises = reorderedTasks.map((task, index) => {
			return TaskRepo.update(task.id, { order: index + 1 })
		})

		await Promise.all(promises)

		return getAll({ listId: task.listId })
	}
}
