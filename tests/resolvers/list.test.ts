import { List, ListWithTasks } from '../../src/@types/list'
import { Db } from '../../src/repositories/db'
import { Status } from '../../src/enums/task'
import { testClient } from '../setup'
import { allLists, createList } from './list.gpl'

describe('ListResolver.allLists', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	test('get all lists without filter should return all lists with its tasks', async () => {
		const { query } = await testClient()
		const response = await query({
			query: allLists,
		})

		const results: ListWithTasks[] = response.data?.allLists

		expect(results.length).toBe(3)
		expect(results[0].tasks.length).toBe(3)
		expect(results[1].tasks.length).toBe(3)
		expect(results[2].tasks.length).toBe(3)
	})

	test('get all lists with given id should return list of given id', async () => {
		const { query } = await testClient()
		const givenId = 1
		const response = await query({
			query: allLists,
			variables: {
				options: {
					id: givenId,
				},
			},
		})

		const results: ListWithTasks[] = response.data?.allLists

		expect(results.length).toBe(1)
		expect(results[0].id).toBe(givenId)
	})

	test('get all lists with given task status should return list that has thier task with given task status', async () => {
		const { query } = await testClient()
		const givenTaskStatus = 'TODO'
		const response = await query({
			query: allLists,
			variables: {
				options: {
					taskStatus: givenTaskStatus,
				},
			},
		})

		const results: ListWithTasks[] = response.data.allLists

		expect(results.length).toBe(3)
		for (const result of results) {
			expect(result.tasks.every((task) => Status[task.status] === Status[givenTaskStatus])).toBe(true)
		}
	})

	test('get all lists with given list id and task status should return only list of given id and thier task has same status with given task status', async () => {
		const { query } = await testClient()
		const givenId = 2
		const givenTaskStatus = 'COMPLETED'
		const response = await query({
			query: allLists,
			variables: {
				options: {
					id: givenId,
					taskStatus: givenTaskStatus,
				},
			},
		})

		const results: ListWithTasks[] = response.data.allLists ?? []

		expect(results.length).toBe(1)
		expect(results[0].id).toBe(givenId)
		for (const result of results) {
			expect(result.tasks.every((task) => Status[task.status] === Status[givenTaskStatus])).toBe(true)
		}
	})
})

describe('ListResolver.createList', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	test('create list with given title should return new list with given title and empty tasks', async () => {
		const { mutate } = await testClient()
		const givenTitle = 'test create list abc'
		const response = await mutate({
			mutation: createList,
			variables: {
				options: {
					title: givenTitle,
				},
			},
		})

		const result: List = response.data.createList
		expect(result).not.toBeUndefined
		expect(result.title).toBe(givenTitle)
	})
})
