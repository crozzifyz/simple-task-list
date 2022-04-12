import 'reflect-metadata'
import { Arg, Query, Resolver, Mutation, Int, InputType, Field } from 'type-graphql'
import List from '../entities/List'
import { Status } from '../enums/task'
import { ListService } from '../services'

@InputType()
class ListQueryInput {
	@Field(() => Int, { nullable: true })
	id?: number

	@Field(() => Status, { nullable: true })
	taskStatus?: Status
}

@InputType()
class ListCreateInput {
	@Field()
	title: string
}

@Resolver()
class ListResolver {
	@Query(() => [List])
	async allLists(@Arg('options', () => ListQueryInput, { nullable: true }) options: ListQueryInput) {
		const listWhere = options && options.id ? { id: options.id } : undefined
		const taskWhere = options && options.taskStatus ? { status: options.taskStatus } : undefined
		return ListService.getAllWithTasks(listWhere, taskWhere)
	}

	@Mutation(() => List)
	async createList(@Arg('options', () => ListCreateInput) options: ListCreateInput) {
		return ListService.create(options)
	}
}

export default ListResolver
