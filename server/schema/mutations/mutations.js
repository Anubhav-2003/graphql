const User = require('../../src/utility/database/models/user');
const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = require('../types/user');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const newUser = new User({
            email: args.email,
            password: args.password,
          });

          const savedUser = await newUser.save();

          return savedUser;
        } catch (error) {
          console.error('Error creating user:', error);
          throw new Error('Error creating user');
        }
      },
    },
    fetchUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const user = await User.findOne({
            email: args.email,
            password: args.password,
          });

          if (!user) {
            // If user is not found, throw an error
            throw new Error('User not found');
          }

          return user;
        } catch (error) {
          console.error('Error fetching user:', error);
          throw new Error('Error fetching user');
        }
      },
    },
  },
});

module.exports = Mutation;
