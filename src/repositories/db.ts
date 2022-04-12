import knex, { Knex } from 'knex'
import { config } from '../config'
import * as knexConfig from '../../knexfile'

export namespace Db {
	type QueryFn = (q: Knex.QueryBuilder) => Knex.QueryBuilder

	export type ErrorDuplicate = {
		code: 'ER_DUP_ENTRY'
	}

	export type ErrorUniqueConstraint = {
		code: '23505'
	}

	export const conn = knex(knexConfig[`${config.env}`])

	export const isErrorDuplicate = (error): error is ErrorDuplicate => {
		return error.code === 'ER_DUP_ENTRY'
	}

	export const isErrorUniqueConstraint = (error): error is ErrorUniqueConstraint => {
		return error.code === '23505'
	}

	export const queryIf =
		(condition: boolean, queryFn: QueryFn) =>
		(query: Knex.QueryBuilder): Knex.QueryBuilder => {
			return condition ? queryFn(query) : query
		}
}
