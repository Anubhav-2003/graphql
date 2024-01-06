const { ApolloServer } = require('apollo-server-express');
const schema = require('../schema/schema.js'); // Make sure the path to your schema is correct
const express = require('express');
const upload = require('./restAPI/upload'); 

const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
  });

  await server.start(); // Start the Apollo Server instance

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
}

startApolloServer().catch(error => {
  console.error('Error starting Apollo Server:', error);
});

app.use('/upload', upload)
