import { Status } from '../../src/enums/task'

/**
 * @param {import("knex") knex}
 */
exports.up = async (knex) => {
	await knex.schema.createTable('tasks', (table) => {
		table.increments('id').primary()
		table.integer('listId').references('lists.id').onDelete('cascade')
		table.string('title')
		table.enu('status', Object.values(Status)).defaultTo(Status.TODO)
		table.integer('order').defaultTo(0)
		table.dateTime('createdAt').defaultTo(knex.fn.now())
		table.dateTime('updatedAt').defaultTo(knex.fn.now())
	})
}

/**
 * @param {import("knex") knex}
 */
exports.down = async (knex) => {
	await knex.schema.dropTable('tasks')
}
