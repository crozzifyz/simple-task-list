/**
 * @param {import("knex") knex}
 */
exports.seed = async (knex) => {
	const lists = [
		{
			id: 1,
			title: 'List#1',
		},
		{
			id: 2,
			title: 'List#2',
		},
		{
			id: 3,
			title: 'List#3',
		},
	]

	const tasks = [
		{
			id: 1,
			listId: 1,
			title: 'Task - A',
			order: 1,
		},
		{
			id: 2,
			listId: 1,
			title: 'Task - B',
			order: 2,
		},
		{
			id: 3,
			listId: 1,
			title: 'Task - C',
			order: 3,
		},
		{
			id: 4,
			listId: 2,
			title: 'Task - D',
			order: 1,
		},
		{
			id: 5,
			listId: 2,
			title: 'Task - E',
			order: 2,
		},
		{
			id: 6,
			listId: 2,
			title: 'Task - F',
			order: 3,
		},
		{
			id: 7,
			listId: 3,
			title: 'Task - G',
			order: 1,
		},
		{
			id: 8,
			listId: 3,
			title: 'Task - H',
			order: 2,
		},
		{
			id: 9,
			listId: 3,
			title: 'Task - I',
			order: 3,
		},
	]

	await knex('lists').del()
	await knex('tasks').del()

	await knex('lists').insert(lists)
	await knex('tasks').insert(tasks)
}
