const { graphql, GraphQLSchema, GraphQLNonNull, GraphQLError } = require('graphql');
const pkg = require('lodash');
const Mutation = require('./mutations/mutations')
const UserType = require('./types/user')
const User = require('../src/utility/database/models/user')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

const { _ } = pkg

const fetchUserDetailsFromDB = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        
        if (!user) {
          throw new Error('User not found');
        }
    
        return {
          id: user.id,
          email: user.email,
        };
      } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Error fetching user details');
      }
  };

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // Defining user query field
      user: {
        type: UserType,
        args: {
          email: { type: GraphQLString },
        },
        resolve: async (parent, { email }) => {
          try {
            const user = await fetchUserDetailsFromDB(email);
            return user;
          } catch (error) {
            console.error('Error fetching user details:', error);
            throw new Error('Error fetching user details');
          }
        },
      },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})

module.exports = schema