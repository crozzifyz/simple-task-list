import 'reflect-metadata'
import { registerEnumType } from 'type-graphql'

export enum Status {
	TODO = 'todo',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
}

registerEnumType(Status, {
	name: 'Status',
	description: `Available task status: ${Object.keys(Status).join(', ')}`,
})
