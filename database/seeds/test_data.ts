/**
 * @param {import("knex") knex}
 */
exports.seed = async (knex) => {
	const lists = [
		{
			title: 'List#1',
		},
		{
			title: 'List#2',
		},
		{
			title: 'List#3',
		},
	]

	const tasks = [
		{
			listId: 1,
			title: 'Task - A',
			order: 1,
			status: 'todo',
		},
		{
			listId: 1,
			title: 'Task - B',
			order: 2,
			status: 'completed',
		},
		{
			listId: 1,
			title: 'Task - C',
			order: 3,
			status: 'todo',
		},
		{
			listId: 2,
			title: 'Task - D',
			order: 1,
			status: 'completed',
		},
		{
			listId: 2,
			title: 'Task - E',
			order: 2,
			status: 'completed',
		},
		{
			listId: 2,
			title: 'Task - F',
			order: 3,
			status: 'todo',
		},
		{
			listId: 3,
			title: 'Task - G',
			order: 1,
			status: 'todo',
		},
		{
			listId: 3,
			title: 'Task - H',
			order: 2,
			status: 'completed',
		},
		{
			listId: 3,
			title: 'Task - I',
			order: 3,
			status: 'todo',
		},
	]

	await knex('lists').del()
	await knex('tasks').del()

	await knex('lists').insert(lists)
	await knex('tasks').insert(tasks)
}
