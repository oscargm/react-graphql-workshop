import { ApolloServer } from 'apollo-server-lambda';
import jwt from 'jsonwebtoken';
import util from 'util';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  // context: async ({ req }) => {
  //   const token = req.headers.authorization
  //     ? req.headers.authorization.replace('Bearer ', '')
  //     : null;

  //   if (token) {
  //     const payload = await util.promisify(jwt.verify)(token, 'whateversecret');

  //     return { user: payload.user };
  //   }

  //   return null;
  // },
  introspection: true,
  playground: true,
});

export const handler = server.createHandler();
