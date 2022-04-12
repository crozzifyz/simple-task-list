import { Task } from '../@types/task'
import { Db } from './db'

export namespace TaskRepo {
	const table = 'tasks'

	const masterQuery = (where?: Partial<Task>) => {
		const query = Db.conn
			.table(table)
			.select()
			.orderBy(`${table}.listId`, 'asc')
			.orderBy(`${table}.order`, 'asc')
			.orderBy(`${table}.id`, 'asc')
		if (where) {
			query.where(where)
		}
		return query
	}

	export const findAll = (where?: Partial<Task>): Promise<Task[]> => {
		return masterQuery(where)
	}

	export const findOne = (where?: Partial<Task>): Promise<Task | undefined> => {
		return masterQuery(where).first()
	}

	export const insert = async (data: Partial<Task>): Promise<Task | Db.ErrorDuplicate | Db.ErrorUniqueConstraint> => {
		try {
			const result: Task[] = await Db.conn(table).insert(data).returning('*')
			return result[0]
		} catch (err) {
			if (Db.isErrorDuplicate(err) || Db.isErrorUniqueConstraint(err)) {
				return err
			}
			throw err
		}
	}

	export const update = async (id: number, data: Omit<Partial<Task>, 'id'>): Promise<Task | undefined> => {
		const result: Task[] = await Db.conn(table).where({ id }).update(data).returning('*')

		return result.length > 0 ? result[0] : undefined
	}

	export const bulkUpdate = async (tasks: Partial<Task>[]): Promise<Task[]> => {
		const result: Task[] = await Db.conn(table).update(tasks).returning('*')

		return result.length > 0 ? result : []
	}
}
