// PubSub: Subscription lib by using socket.io
import { GraphQLServer, PubSub } from 'graphql-yoga';

import db from './db';
import { Query, Mutation, Subscription, User, Post, Comment } from './resolvers';

// just running the file.
import './prisma';

// const pubsub = new PubSub();

// const server = new GraphQLServer({
//     // path is based on root directory!!!!
//     typeDefs: './src/schema.graphql',
//     resolvers: {
//         Query,
//         Mutation,
//         Subscription,
//         User,
//         Post,
//         Comment
//     },
//     context: {
//         db,
//         pubsub
//     }
// });

// server.start(() => console.log('subsription!'));