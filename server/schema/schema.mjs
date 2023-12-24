import { GraphQLSchema, graphql } from 'graphql' 
import { _ } from 'lodash'
import { GraphQLObjectType, GraphQLString } from 'graphql'


//Dummy DB
let books = [
    {id: '1', name: "Count of Monte Cristo", genre: "Adventure"},
    {id: '2', name: "Ben Hur", genre: "Adventure"}
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
}) 


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})