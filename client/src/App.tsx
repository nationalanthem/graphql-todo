import { useQuery } from '@apollo/client'
import { GET_TODOS, ITodo } from './graphql/queries'
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from './graphql/mutations'
import { useMutation } from '@apollo/client'
import Todo from './Todo'
import { useState } from 'react'

export default function App() {
  const [createTodo] = useMutation(CREATE_TODO, { refetchQueries: () => [{ query: GET_TODOS }] })
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: () => [{ query: GET_TODOS }],
  })
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: () => [{ query: GET_TODOS }],
  })

  const { loading, error, data } = useQuery<{ todos: ITodo[] }>(GET_TODOS)
  const [todoTitle, setTodoTitle] = useState('')

  if (loading) return <h1>Loading</h1>
  if (error) return <h1>Error</h1>
  if (!data) return <h1>No data</h1>

  return (
    <div>
      {data.todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          onDelete={() => {
            deleteTodo({ variables: { id: todo.id } })
          }}
          onUpdate={(title: string) => {
            updateTodo({ variables: { id: todo.id, title } })
          }}
        />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input type="text" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />
        <button
          disabled={!todoTitle.trim()}
          onClick={() => {
            createTodo({ variables: { title: todoTitle } })
            setTodoTitle('')
          }}
        >
          Create Todo
        </button>
      </div>
    </div>
  )
}
