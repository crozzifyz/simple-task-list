import dotenv from 'dotenv'

dotenv.config()

const postgresqlConfig = {
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT || 5432,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		directory: `${__dirname}/database/migrations`,
		stub: `${__dirname}/database/template.ts`,
	},
	seeds: {
		directory: `${__dirname}/database/seeds`,
	},
}

const testConfig = {
	...postgresqlConfig,
	connection: {
		...postgresqlConfig.connection,
		database: `${postgresqlConfig.connection.database}_test`,
	},
}

module.exports = {
	development: postgresqlConfig,
	qa: postgresqlConfig,
	uat: postgresqlConfig,
	production: postgresqlConfig,
	test: testConfig,
}
