const { ApolloServer, ApolloError, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const util = require('util');
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
} = require('./db/users');
const {
  getAllTweets,
  getTweetById,
  getTweetsFrom,
  createTweet,
  deleteTweet,
} = require('./db/tweets');

const typeDefs = gql`
  type Query {
    me: User
    users: [User!]!
    userById(id: ID!): User!
    userByUsername(username: String!): User!
    tweets: [Tweet!]!
    tweetById(id: ID!): Tweet!
    tweetsFromUser(username: String!): [Tweet!]!
  }
  type Mutation {
    createTweet(from: String!, tweet: String!): Tweet!
    deleetTweet(id: ID!): Tweet!
    createUser(
      username: String!
      displayName: String
      bio: String
      photo: String
    ): User!
    updateUser(
      username: String!
      displayName: String
      bio: String
      photo: String
    ): User!
    deleteUser(id: ID!): User!
  }
  type User {
    id: ID!
    createdAt: String!
    username: String!
    displayName: String
    bio: String
    email: String
    photo: String
    tweets: [Tweet!]
  }
  type Tweet {
    id: String!
    createdAt: String!
    tweet: String!
    from: User!
  }

  type Person {
    id: ID! # Not nullable
    name: String # Nullable
    age: Int
    weight: Float
    isOnline: Boolean
    posts: [Post!]! # Not nullable (but empty list is fine)
  }

  type Post {
    id: ID!
    slug: String!
    text: String!
  }
`;

const resolvers = {
  Query: {
    me: (_, args, context) => getUserByUsername(context.user),
    users: () => getAllUsers(),
    userById: (obj, args) => getUserById(args.id),
    userByUsername: (obj, args) => getUserByUsername(args.username),
    tweets: () => getAllTweets(),
    tweetById: (obj, args) => getTweetById(args.id),
    tweetsFromUser: (obj, args) => getTweetsFrom(args.username),
  },
  User: {
    tweets: obj => getTweetsFrom(obj.username),
  },
  Tweet: {
    from: obj => getUserByUsername(obj.from),
  },
  Mutation: {
    createTweet: async (_, args) => {
      try {
        return createTweet(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    deleetTweet: async (_, args) => {
      try {
        return deleteTweet(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    createUser: async (_, args) => {
      try {
        return createUser(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateUser: async (_, args) => {
      try {
        return updateUser(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        return deleteUser(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : null;

    if (token) {
      const payload = await util.promisify(jwt.verify)(token, 'whateversecret');

      return { user: payload.user };
    }

    return null;
  },
});

server.listen().then(server => console.log(`Server started at ${server.url}`));
