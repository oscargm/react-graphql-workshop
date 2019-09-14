!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("apollo-server-lambda")},function(e,t){e.exports=require("cuid")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("util")},function(e,t,r){const{ApolloError:n}=r(0),{createTweet:o,deleteTweet:i,getAllTweets:s,getTweetsFrom:a,getTweetById:c}=r(7),{createUser:u,updateUser:l,deleteUser:p,getAllUsers:f,getUserByUsername:d}=r(8),y={Mutation:{createTweet:async(e,t)=>{try{return o(t)}catch(e){throw new n(e)}},deleteTweet:async(e,t)=>{try{return i(t)}catch(e){throw new n(e)}},createUser:async(e,t)=>{try{return u(t)}catch(e){throw new n(e)}},updateUser:async(e,t)=>{try{return l(t)}catch(e){throw new n(e)}},deleteUser:async(e,t)=>{try{return p(t)}catch(e){throw new n(e)}}},Query:{me:(e,t,r)=>d(r.user),tweet:(e,t)=>c(t.id),tweets:()=>s(),users:()=>f(),user:(e,t)=>d(t.username)},Tweet:{from:e=>d(e.from)},User:{email:(e,t,r)=>r.user===e.username?e.email:null,tweets:e=>a(e.username)}};e.exports=y},function(e,t,r){const{gql:n}=r(0),o=n`
  type Mutation {
    createTweet(tweet: String!, from: String!): Tweet!
    deleteTweet(id: ID!): Tweet!
    createUser(
      username: String!
      bio: String
      displayName: String
      photo: String
    ): User!
    updateUser(
      id: ID!
      bio: String
      displayName: String
      photo: String
      username: String!
    ): User!
    deleteUser(id: ID!): User!
  }

  type Query {
    me: User
    user(username: String!): User
    users: [User!]!
    tweet(id: ID!): Tweet
    tweets: [Tweet!]!
  }

  type Tweet {
    id: ID!
    createdAt: String!
    tweet: String!
    from: User!
  }

  type User {
    id: ID!
    createdAt: String!
    username: String!
    displayName: String
    bio: String
    email: String
    photo: String
    tweets: [Tweet!]!
  }
`;e.exports=o},function(e,t,r){"use strict";r.r(t),r.d(t,"handler",function(){return d});var n=r(0),o=r(2),i=r.n(o),s=r(3),a=r.n(s),c=r(4),u=r.n(c),l=r(5),p=r.n(l);const f=new n.ApolloServer({resolvers:u(),typeDefs:p(),context:async({req:e})=>{const t=e.headers.authorization?e.headers.authorization.replace("Bearer ",""):null;if(t){return{user:(await a.a.promisify(i.a.verify)(t,"whateversecret")).user}}return null},introspection:!0,playground:!0}),d=f.createHandler();f.listen().then(e=>console.log(`Server started at ${e.url}`))},function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const i=r(1);let s=[{id:"1",tweet:"Hello! This is my first tweet.",from:"glnnrys",createdAt:new Date("March 9, 2019").toISOString()},{id:"2",tweet:"Hei! This is my first tweet.",from:"bebraw",createdAt:new Date("April 16, 2019").toISOString()}];const a=async e=>s.find(t=>t.id===e);e.exports={createTweet:async e=>{const t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){o(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e,{id:i(),createdAt:(new Date).toISOString()});return s=[...s,t],t},deleteTweet:async({id:e})=>{const t=a(e);return s=s.filter(t=>t.id!==e),t},getAllTweets:async()=>s,getTweetById:a,getTweetsFrom:async e=>s.filter(t=>t.from===e)}},function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){i(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=r(1);let a=[{id:"1",username:"glnnrys",displayName:"Glenn Reyes",bio:"Independent Software Engineer helping people build beautiful products through web technologies · React, GraphQL, TypeScript · Speaker · Teacher",email:"glenn@glennreyes.com",photo:"https://user-images.githubusercontent.com/5080854/57783608-b6c3d880-772e-11e9-9c94-7a8c3af16f28.jpg",createdAt:new Date("January 2, 2019").toISOString()},{id:"2",username:"bebraw",displayName:"Juho Vepsäläinen",bio:"Founder of @survivejs, @jsterlibs, @ReactFinland, @GraphQLFinland. Winner of @bluearrowawards.",email:"bebraw@gmail.com",photo:"https://api.react-finland.fi/media/people/juho.jpg",createdAt:new Date("February 13, 2019").toISOString()}];const c=async e=>a.find(t=>t.id===e),u=async e=>a.find(t=>t.username===e);e.exports={createUser:async e=>{const t=o({},e,{id:s(),createdAt:(new Date).toISOString()});return a=[...a,t],t},updateUser:async e=>{const t=await u(e.username);if(!t)throw new Error("User doesn't exist.");return a=a.map(t=>t.username===e.username?o({},t,{},e):t),o({},t,{},e)},deleteUser:async e=>{const t=await c(e.id);if(!t)throw new Error("User doesn't exist.");return a=a.filter(t=>t.id!==e.id),t},getAllUsers:async()=>a,getUserById:c,getUserByUsername:u}}]));