import { Db } from '../../src/repositories/db'
import { Status } from '../../src/enums/task'
import { ListService } from '../../src/services'

describe('getAllWithTasks', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	it('getAllWithTasks should return all lists with thier tasks', async () => {
		const lists = await ListService.getAllWithTasks(undefined, undefined)

		expect(lists.length).toBe(3)
		expect(lists.every((list) => list.tasks !== undefined && list.tasks.length > 0)).toBe(true)
	})

	it('getAllWithTasks with list filter should return filtered list with thier tasks', async () => {
		const lists = await ListService.getAllWithTasks({ id: 1 }, undefined)

		expect(lists.length).toBe(1)
		expect(lists[0].id).toBe(1)
		expect(lists.every((list) => list.tasks !== undefined && list.tasks.length > 0)).toBe(true)
	})

	it('getAllWithTasks with list filter should return filtered list with thier tasks', async () => {
		const lists = await ListService.getAllWithTasks(undefined, { status: Status.COMPLETED })

		expect(lists.length).toBe(3)
		for (const list of lists) {
			expect(list.tasks.every((task) => Status[task.status] === Status[Status.COMPLETED])).toBe(true)
		}
	})

	it('getAllWithTasks with list filter should return filtered list with thier tasks', async () => {
		const lists = await ListService.getAllWithTasks({ id: 1 }, { status: Status.TODO })

		expect(lists.length).toBe(1)
		for (const list of lists) {
			expect(list.tasks.every((task) => Status[task.status] === Status[Status.TODO])).toBe(true)
		}
	})
})

describe('getById', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	it('getById with given id should return list of given id with thier tasks', async () => {
		const list = await ListService.getById(1)

		expect(list).not.toBeUndefined
		expect(list.tasks).not.toBeUndefined
		expect(list.id).toBe(1)
	})

	it('getById with invalid id should throw not found error', async () => {
		const givenId = 999

		await expect(ListService.getById(givenId)).rejects.toThrowError(`List not found for id ${givenId}`)
	})
})

describe('create', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	it('create list should return new created list', async () => {
		const title = 'test create list'
		const list = await ListService.create({ title })

		expect(list).not.toBeUndefined
		expect(list.title).toBe(title)
	})
})
