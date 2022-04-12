/**
 * @param {import("knex") knex}
 */
exports.up = async (knex) => {
	await knex.schema.createTable('tableName', (table) => {
		table.increments('id').primary()
	})
}

/**
 * @param {import("knex") knex}
 */
exports.down = async (knex) => {
	await knex.schema.dropTable('tableName')
}
