// Creating Prisma End Point

import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    // define path of the schema generated by ".graphqlconfig"
    //  which is a bridge of node and prisma
    typeDefs: 'src/generated/prisma.graphql',
    // url for prisma
    endpoint: 'http://192.168.99.100:4466'
});

// [ Query ]
// 1. Simple Query
// "Prisma" itself creates querys when we create custom type schema.
// when we do not need to put args
// prisma.query.users(null,'{ id name }')
//     .then(users => console.log(users));

// 2. Query with associations
// // fetching custom type (associated data) inside of a query
// prisma.query.users(null, '{ id name posts { id title} }')
//     .then(users => {
//         console.log(JSON.stringify(users, undefined, 4))
//     });

// prisma.query.comments(null, '{ id, text author { id, name } post { id title body }}')
//     .then(comments => console.log(JSON.stringify(comments, undefined, 4)));

// [ Mutation ]
// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL SetUp",
//         body: "You can find a new course",
//         published: true,
//         author: {
//             connect: {
//                 id: "cjy0ytnjo001n0757pue36cpp"
//             }
//         }
//     }
// }, '{ id, title, body, published, author { id, name } }')
//     .then(post => console.log(JSON.stringify(post, undefined, 4)));

// [ Query after Mutation ]
// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL SetUp",
//         body: "You can find a new course",
//         published: true,
//         author: {
//             connect: {
//                 id: "cjy0ytnjo001n0757pue36cpp"
//             }
//         }
//     }
// }, '{ id, title, body, published, author { id, name } }')
//     .then(posts => {
//         console.log(JSON.stringify(posts, undefined, 4));
//         return prisma.query.users(null, '{ id, name, email, posts { id, title, body, published }}')    
//     })
//     .then(users => console.log(JSON.stringify(users, undefined, 4)));


// [ Query after Update ]
// prisma.mutation.updatePost({
//     data: {
//         title: "Prisma is great",
//         body: "Prisma is really easy",
//         published: false
//     },
//     where: {
//         id: "cjy285utq001t0757xqvb176a"
//     }
// }, '{ id, title, body, published, author { id name email }}')
//     .then(post => {
//         console.log(JSON.stringify(post, undefined, 4));
//         return prisma.query.users(null, '{ id name, email, posts { title }}');
//     })
//     .then(users => console.log(JSON.stringify(users, undefined, 4)));


// By using Async/Wait
// 1. create a new post
// 2. Fetch all of the info about the users

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: { ...data, author: { connect: { id: authorId }}},
    }, '{ id }');

    // One single user
    const user = await prisma.query.user({
        where: { id: authorId }
    }, '{ id, name, email posts { id title body published }}');

    return user;
}

createPostForUser('cjy0zd3tr00310757sa4xij6r', {
    title: 'Hey buddy',
    body: 'I strongly recommend prisma',
    published: false
})
// because createPostForUser is a promise.
.then(user => console.log('user: ', user));
// [ Query ]
// 1. Simple Query
// "Prisma" itself creates querys when we create custom type schema.
// when we do not need to put args
// prisma.query.users(null,'{ id name }')
//     .then(users => console.log(users));

// 2. Query with associations
// // fetching custom type (associated data) inside of a query
// prisma.query.users(null, '{ id name posts { id title} }')
//     .then(users => {
//         console.log(JSON.stringify(users, undefined, 4))
//     });

// prisma.query.comments(null, '{ id, text author { id, name } post { id title body }}')
//     .then(comments => console.log(JSON.stringify(comments, undefined, 4)));
