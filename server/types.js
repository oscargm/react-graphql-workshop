const { gql } = require('apollo-server');
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
module.exports = typeDefs;
