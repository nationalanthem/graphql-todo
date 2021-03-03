import { Resolver, Mutation, Query, Arg, Int } from 'type-graphql'
import { Todo } from './models'

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  async todos() {
    return await Todo.find()
  }

  @Mutation(() => Todo)
  async createTodo(@Arg('title') title: string) {
    const todo = await Todo.create({ title }).save()
    return todo
  }

  @Mutation(() => Boolean)
  async updateTodo(@Arg('id', () => Int) id: number, @Arg('title') title: string) {
    await Todo.update({ id }, { title })
    return true
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg('id', () => Int) id: number) {
    await Todo.delete({ id })
    return true
  }
}
