const { ApolloError } = require('apollo-server');
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
module.exports = resolvers;
