import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../.env') })

export const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 4000,
	db_host: process.env.DB_HOST,
	db_port: process.env.DB_PORT || 5432,
	db_name: process.env.DB_NAME,
	db_user: process.env.DB_USER,
	db_password: process.env.DB_PASSWORD,
}
