import { Db } from '../../src/repositories/db'
import { Status } from '../../src/enums/task'
import { TaskService } from '../../src/services'

describe('getById', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	it('getById with given id should return task of given id', async () => {
		const task = await TaskService.getById(1)

		expect(task).not.toBeUndefined
		expect(task.id).toBe(1)
	})

	it('getById with invalid id should throw not found error', async () => {
		const givenId = 999

		await expect(TaskService.getById(givenId)).rejects.toThrowError(`Task not found for id ${givenId}`)
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

	it('create task should return new created task', async () => {
		const givenListId = 1
		const givenTitle = 'test create task'
		const task = await TaskService.create({ listId: givenListId, title: givenTitle })

		expect(task).not.toBeUndefined
		expect(task.title).toBe(givenTitle)
		expect(task.listId).toBe(givenListId)
	})

	it('create task with invalid list id should throw list not found error', async () => {
		const givenListId = 999
		const givenTitle = 'test create task'

		await expect(TaskService.create({ listId: givenListId, title: givenTitle })).rejects.toThrowError(
			`List not found for id ${givenListId}`
		)
	})
})

describe('update', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	it('update task with valid info should return updated task', async () => {
		const givenId = 1
		const givenTitle = 'test update task info'
		const task = await TaskService.update({ id: 1, title: givenTitle, status: Status.COMPLETED })

		expect(task).not.toBeUndefined
		expect(task.id).toBe(givenId)
		expect(task.title).toBe(givenTitle)
		expect(Status[task.status]).toBe(Status[Status.COMPLETED])
	})

	it('update task with invalid id should throw task not found error', async () => {
		const givenId = 999
		const givenTitle = 'test create task'

		await expect(
			TaskService.update({ id: givenId, title: givenTitle, status: Status.COMPLETED })
		).rejects.toThrowError(`Task not found for id ${givenId}`)
	})
})

describe('reorder', () => {
	beforeAll(async () => {
		await Db.conn.migrate.rollback()
		await Db.conn.migrate.latest()
		await Db.conn.seed.run({ specific: 'test_data.ts' })
	})

	afterAll(async () => {
		await Db.conn.migrate.rollback()
	})

	it('reorder task with valid info should return reordered tasks', async () => {
		const beforeReorderTasks = await TaskService.getAll({ listId: 1 })
		const reorderedTasks = await TaskService.reorder({ id: 1, order: 3 })

		expect(beforeReorderTasks).not.toBeUndefined
		expect(beforeReorderTasks[0].id).toBe(1)
		expect(beforeReorderTasks[1].id).toBe(2)
		expect(beforeReorderTasks[2].id).toBe(3)

		expect(reorderedTasks).not.toBeUndefined
		expect(reorderedTasks[0].id).toBe(2)
		expect(reorderedTasks[1].id).toBe(3)
		expect(reorderedTasks[2].id).toBe(1)
	})

	it('reorder task with invalid id should throw task not found error', async () => {
		const givenId = 999

		await expect(TaskService.reorder({ id: givenId, order: 3 })).rejects.toThrowError(
			`Task not found for id ${givenId}`
		)
	})
})
