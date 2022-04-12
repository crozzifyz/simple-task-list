import { List } from '../@types/list'
import { Db } from './db'

export namespace ListRepo {
	const table = 'lists'

	const masterQuery = (where?: Partial<List>) => {
		const query = Db.conn.table(table).select()
		if (where) {
			query.where(where)
		}
		return query
	}

	export const findAll = (where?: Partial<List>): Promise<List[]> => {
		return masterQuery(where)
	}

	export const findOne = (where?: Partial<List>): Promise<List | undefined> => {
		return masterQuery(where).first()
	}

	export const insert = async (data: Partial<List>): Promise<List | Db.ErrorDuplicate> => {
		try {
			const result: List[] = await Db.conn(table).insert(data).returning('*')
			return result[0]
		} catch (err) {
			if (Db.isErrorDuplicate(err)) {
				return err
			}
			throw err
		}
	}

	export const update = async (id: number, data: Omit<Partial<List>, 'id'>): Promise<List | undefined> => {
		const result: List[] = await Db.conn(table).where({ id }).update(data).returning('*')

		return result?.length > 0 ? result[0] : undefined
	}
}
