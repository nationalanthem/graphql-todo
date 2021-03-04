import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { TodoResolver } from './resolvers'
import cors from 'cors'
;(async () => {
  try {
    const app = express()
    app.use(cors())
    await createConnection()
    const apolloServer = new ApolloServer({
      schema: await buildSchema({ resolvers: [TodoResolver] }),
    })
    apolloServer.applyMiddleware({ app })
    app.listen(3001, () =>
      console.log('Listening at http://localhost:3001' + apolloServer.graphqlPath)
    )
  } catch (e) {
    console.log(e)
  }
})()
