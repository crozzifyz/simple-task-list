import 'reflect-metadata'
import { Field, Int, ObjectType } from 'type-graphql'
import { Status } from '../enums/task'

@ObjectType()
class Task {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	listId: number

	@Field()
	title: string

	@Field(() => Status)
	status: Status

	@Field(() => Int)
	order: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

export default Task
