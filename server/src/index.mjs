import { ApolloServer } from 'apollo-server-express';
import schema from '../schema/schema.mjs'; // Make sure the path to your schema is correct
import express from 'express';

async function startApolloServer() {
  const app = express();

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
