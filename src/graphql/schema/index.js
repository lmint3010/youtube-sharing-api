const { buildSchema } = require('graphql');

const mutations = require('./mutations');
const queries = require('./queries');
const types = require('./types');
const inputs = require('./inputs');

module.exports = buildSchema(`
    ${inputs}
    ${types}
    ${queries}
    ${mutations}
`);
