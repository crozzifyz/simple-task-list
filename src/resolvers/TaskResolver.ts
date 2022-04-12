import 'reflect-metadata'
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql'
import Task from '../entities/Task'
import { Status } from '../enums/task'
import { TaskService } from '../services'

@InputType()
class TaskQueryInput {
	@Field(() => Int, { nullable: true })
	id?: number

	@Field(() => Int, { nullable: true })
	listId?: number

	@Field(() => Status, { nullable: true })
	status?: Status
}

@InputType()
class TaskCreateInput {
	@Field(() => Int)
	listId: number

	@Field()
	title: string
}

@InputType()
class TaskUpdateInput {
	@Field(() => Int)
	id: number

	@Field({ nullable: true })
	title: string

	@Field(() => Status, { nullable: true })
	status: Status
}

@InputType()
class TaskReorderInput {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	order: number
}

@Resolver()
class TaskResolver {
	@Query(() => [Task])
	async allTasks(@Arg('options', () => TaskQueryInput, { nullable: true }) options: TaskQueryInput) {
		return TaskService.getAll(options)
	}

	@Mutation(() => Task)
	async createTask(@Arg('options', () => TaskCreateInput) options: TaskCreateInput) {
		return TaskService.create(options)
	}

	@Mutation(() => Task)
	async updateTask(@Arg('options', () => TaskUpdateInput) options: TaskUpdateInput) {
		return TaskService.update(options)
	}

	@Mutation(() => [Task])
	async reorderTask(@Arg('options', () => TaskReorderInput) options: TaskReorderInput) {
		return TaskService.reorder(options)
	}
}

export default TaskResolver
