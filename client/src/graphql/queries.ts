import { gql } from '@apollo/client'

export interface ITodo {
  id: number
  title: string
}

export const GET_TODOS = gql`
  query {
    todos {
      id
      title
    }
  }
`
