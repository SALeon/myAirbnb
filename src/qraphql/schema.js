const { GraphQLSchema } = require('graphql');
const userQuery = require('./user/query.js');

module.exports = new GraphQLSchema({ query: userQuery });
