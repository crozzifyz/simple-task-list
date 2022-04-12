import { Task } from '../../src/@types/task'
import { Db } from '../../src/repositories/db'
import { Status } from '../../src/enums/task'
import { testClient } from '../setup'
import { allTasks, createTask, updateTask, reorderTask } from './task.gpl'

describe('TaskResolver.allTasks', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	test('get all tasks without filter should return all tasks', async () => {
		const { query } = await testClient()
		const response = await query({
			query: allTasks,
		})

		const results: Task[] = response.data.allTasks

		expect(results.length).toBe(9)
	})

	test('get all tasks with given id should return task of given id', async () => {
		const { query } = await testClient()
		const givenId = 3
		const response = await query({
			query: allTasks,
			variables: {
				options: {
					id: givenId,
				},
			},
		})

		const results: Task[] = response.data.allTasks

		expect(results.length).toBe(1)
		expect(results[0].id).toBe(givenId)
	})

	test('get all tasks with given list id should return all tasks of given list id', async () => {
		const { query } = await testClient()
		const givenId = 2
		const response = await query({
			query: allTasks,
			variables: {
				options: {
					listId: givenId,
				},
			},
		})

		const results: Task[] = response.data.allTasks

		expect(results.length).toBe(3)
		expect(results[0].id).toBe(4)
		expect(results[1].id).toBe(5)
		expect(results[2].id).toBe(6)
	})

	test('get all tasks with given status should return all tasks with given status', async () => {
		const { query } = await testClient()
		const givenStatus = 'TODO'
		const response = await query({
			query: allTasks,
			variables: {
				options: {
					status: givenStatus,
				},
			},
		})

		const results: Task[] = response.data.allTasks

		expect(results.length).toBe(5)
		expect(results.every((task) => Status[task.status] === Status[givenStatus])).toBe(true)
	})
})

describe('TaskResolver.createTask', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	test('create task with given valid info should return new task with given info', async () => {
		const { mutate } = await testClient()
		const givenListId = 1
		const givenTitle = 'test create task abc'
		const response = await mutate({
			mutation: createTask,
			variables: {
				options: {
					listId: givenListId,
					title: givenTitle,
				},
			},
		})

		const result: Task = response.data.createTask

		expect(result).not.toBeUndefined
		expect(result.title).toBe(givenTitle)
		expect(result.listId).toBe(givenListId)
	})
})

describe('TaskResolver.updateTask', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	test('update task with given valid info should return updated task with given info', async () => {
		const { mutate } = await testClient()
		const givenId = 1
		const givenTitle = 'test update task xyz'
		const givenStatus = 'COMPLETED'
		const response = await mutate({
			mutation: updateTask,
			variables: {
				options: {
					id: givenId,
					title: givenTitle,
					status: givenStatus,
				},
			},
		})

		const result: Task = response.data.updateTask

		expect(result).not.toBeUndefined
		expect(result.id).toBe(givenId)
		expect(result.title).toBe(givenTitle)
		expect(Status[result.status]).toBe(Status[givenStatus])
	})
})

describe('TaskResolver.reorderTask', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	test('reorder task with given new order should return new reordered list of tasks with same parent list id', async () => {
		const { query, mutate } = await testClient()
		const givenListId = 1
		const givenId = 1
		const givenOrder = 2

		const beforeResponse = await query({
			query: allTasks,
			variables: {
				options: {
					listId: givenListId,
				},
			},
		})
		const response = await mutate({
			mutation: reorderTask,
			variables: {
				options: {
					id: givenId,
					order: givenOrder,
				},
			},
		})
		const beforeResults: Task[] = beforeResponse.data.allTasks
		const results: Task[] = response.data.reorderTask

		expect(results).not.toBeUndefined
		expect(beforeResults.length).toBe(3)
		expect(results.length).toBe(3)

		expect(beforeResults[0].id).toBe(1)
		expect(beforeResults[1].id).toBe(2)
		expect(beforeResults[2].id).toBe(3)

		expect(results[0].id).toBe(2)
		expect(results[1].id).toBe(1)
		expect(results[2].id).toBe(3)
	})

	test('reorder task with out of bound position should throw out of bound error', async () => {
		const { mutate } = await testClient()
		const givenId = 1
		const givenOrder = 999
		const response = await mutate({
			mutation: reorderTask,
			variables: {
				options: {
					id: givenId,
					order: givenOrder,
				},
			},
		})

		expect(response.data).toBeNull
		if (response.errors) {
			expect(response.errors[0].message).toContain(`New position ${givenOrder} is out of bound`)
		}
	})
})
