import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.mjs'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema
}))

app.listen(4000, () => {
    console.log("Server running on port 4000")
})