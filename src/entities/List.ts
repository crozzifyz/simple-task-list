import 'reflect-metadata'
import { Field, Int, ObjectType } from 'type-graphql'
import Task from './Task'

@ObjectType()
class List {
	@Field(() => Int)
	id: number

	@Field()
	title: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date

	@Field(() => [Task])
	tasks: Task[]
}

export default List
