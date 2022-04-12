/**
 * @param {import("knex") knex}
 */
exports.up = async (knex) => {
	await knex.schema.createTable('lists', (table) => {
		table.increments('id').primary()
		table.string('title')
		table.dateTime('createdAt').defaultTo(knex.fn.now())
		table.dateTime('updatedAt').defaultTo(knex.fn.now())
	})
}

/**
 * @param {import("knex") knex}
 */
exports.down = async (knex) => {
	await knex.schema.dropTable('lists')
}
