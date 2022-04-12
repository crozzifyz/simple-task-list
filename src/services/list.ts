import { ListRepo, TaskRepo } from '../repositories'
import { List, ListWithTasks } from '../@types/list'
import { Task } from '../@types/task'
import { ApolloError } from 'apollo-server-core'
import { Db } from '../repositories/db'

export namespace ListService {
	export const getAllWithTasks = async (
		listWhere: Partial<List> | undefined,
		taskWhere: Omit<Partial<Task>, 'id'> | undefined
	): Promise<ListWithTasks[]> => {
		const lists = await ListRepo.findAll(listWhere)

		const listsPs = lists.map(async (list) => {
			const tasks = await TaskRepo.findAll({ ...taskWhere, listId: list.id })
			return {
				...list,
				tasks,
			}
		})

		return Promise.all(listsPs)
	}

	export const getById = async (id: number, excludingTasks: boolean = false): Promise<ListWithTasks> => {
		const list = await ListRepo.findOne({ id })
		if (!list) {
			throw new ApolloError(`List not found for id ${id}`)
		}

		const tasks = excludingTasks ? [] : await TaskRepo.findAll({ listId: list.id })
		return {
			...list,
			tasks,
		}
	}

	export const create = async (input: Pick<List, 'title'>): Promise<ListWithTasks> => {
		const createdList = await ListRepo.insert({ title: input.title })
		if (Db.isErrorDuplicate(createdList)) {
			throw new ApolloError('Duplicated data')
		}
		if (Db.isErrorUniqueConstraint(createdList)) {
			throw new ApolloError('Violates unique constraint')
		}

		return {
			...createdList,
			tasks: [],
		}
	}
}
