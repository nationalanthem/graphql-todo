import 'reflect-metadata'
import express, { Application } from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer, gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const app = express()

apolloServer.applyMiddleware({ app })

app.use(express.json())

const main = async (app: Application) => {
  try {
    await createConnection()
    app.listen(3001, () =>
      console.log('Listening at http://localhost:3001' + apolloServer.graphqlPath)
    )
  } catch (e) {
    console.log(e)
  }
}

main(app)
