!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("apollo-server-lambda")},function(e,t){e.exports=require("cuid")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("util")},function(e,t,r){const{ApolloError:n}=r(0),{createTweet:a,deleteTweet:o,getAllTweets:i,getTweetsFrom:s,getTweetById:c}=r(7),{createUser:u,updateUser:l,deleteUser:p,getAllUsers:d,getUserByUsername:f}=r(8),y={Mutation:{createTweet:async(e,t)=>{try{return a(t)}catch(e){throw new n(e)}},deleteTweet:async(e,t)=>{try{return o(t)}catch(e){throw new n(e)}},createUser:async(e,t)=>{try{return u(t)}catch(e){throw new n(e)}},updateUser:async(e,t)=>{try{return l(t)}catch(e){throw new n(e)}},deleteUser:async(e,t)=>{try{return p(t)}catch(e){throw new n(e)}}},Query:{me:(e,t,r)=>f(r.user),tweet:(e,t)=>c(t.id),tweets:()=>i(),users:()=>d(),user:(e,t)=>f(t.username)},Tweet:{from:e=>f(e.from)},User:{email:(e,t,r)=>r.user===e.username?e.email:null,tweets:e=>s(e.username)}};e.exports=y},function(e,t,r){const{gql:n}=r(0),a=n`
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
`;e.exports=a},function(e,t,r){"use strict";r.r(t),r.d(t,"handler",function(){return d});var n=r(0),a=r(2),o=r.n(a),i=r(3),s=r.n(i),c=r(4),u=r.n(c),l=r(5),p=r.n(l);const d=new n.ApolloServer({resolvers:u(),typeDefs:p(),context:async({event:e})=>{const t=e.headers.authorization?e.headers.authorization.replace("Bearer ",""):null;if(t){return{user:(await s.a.promisify(o.a.verify)(t,"whateversecret")).user}}return null},introspection:!0,playground:!0}).createHandler()},function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const o=r(1);let i=[{id:"1",tweet:"Hola! This is my first tweet.",from:"glnnrys",createdAt:new Date("Sep 9, 2019").toISOString()},{id:"2",tweet:"Buenos dias Alicante!",from:"nacmartin",createdAt:new Date("Sep 25, 2019").toISOString()},{id:"3",tweet:"No puedo esperar para la conferencia @reactalicante mañana!",from:"vicqr",createdAt:new Date("Sep 26, 2019").toISOString()},{id:"4",tweet:"So many people attending this workshop @reactalicante!",from:"glnnrys",createdAt:new Date("Sep 26, 2019").toISOString()}];const s=async e=>i.find(t=>t.id===e);e.exports={createTweet:async e=>{const t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){a(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e,{id:o(),createdAt:(new Date).toISOString()});return i=[...i,t],t},deleteTweet:async({id:e})=>{const t=s(e);return i=i.filter(t=>t.id!==e),t},getAllTweets:async()=>i,getTweetById:s,getTweetsFrom:async e=>i.filter(t=>t.from===e)}},function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){o(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const i=r(1);let s=[{id:"1",username:"glnnrys",displayName:"Glenn Reyes",bio:"Independent Software Engineer helping people build beautiful products through web technologies · React, GraphQL, TypeScript · Speaker · Teacher",email:"glenn@glennreyes.com",photo:"https://user-images.githubusercontent.com/5080854/57783608-b6c3d880-772e-11e9-9c94-7a8c3af16f28.jpg",createdAt:new Date("January 2, 2019").toISOString()},{id:"2",username:"nacmartin",displayName:"Nacho Martin",bio:'Nacho Martín is a developer, consultant and trainer at Limenius, company that he co-founded. He is an active open source contributor and is enjoying his work with <span class="collapse fade">React and React Native as if it was his first day in this profession. He has usually dreams in which he is programming, so he tries to do it well to avoid nightmares.',email:"nacho@gmail.com",photo:"https://reactalicante.es/uploads/images/speakers/nacho.jpg",createdAt:new Date("February 13, 2019").toISOString()},{id:"3",username:"vicqr",displayName:"Victoria Quirante",bio:"Full-stack software developer and co-founder at Limenius. Building projects with Symfony, React and React Native. Speaker, trainer, and dedicated amateur football player.",email:"victoria@gmail.com",photo:"https://reactalicante.es/uploads/images/speakers/avatar.jpg",createdAt:new Date("February 14, 2019").toISOString()}];const c=async e=>s.find(t=>t.id===e),u=async e=>s.find(t=>t.username===e);e.exports={createUser:async e=>{const t=a({},e,{id:i(),createdAt:(new Date).toISOString()});return s=[...s,t],t},updateUser:async e=>{const t=await u(e.username);if(!t)throw new Error("User doesn't exist.");return s=s.map(t=>t.username===e.username?a({},t,{},e):t),a({},t,{},e)},deleteUser:async e=>{const t=await c(e.id);if(!t)throw new Error("User doesn't exist.");return s=s.filter(t=>t.id!==e.id),t},getAllUsers:async()=>s,getUserById:c,getUserByUsername:u}}]));