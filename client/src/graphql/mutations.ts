import { gql } from '@apollo/client'

export const CREATE_TODO = gql`
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo($id: Int!, $title: String!) {
    updateTodo(id: $id, title: $title)
  }
`
