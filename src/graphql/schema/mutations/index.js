const user = require('./user.mutation');
const video = require('./video.mutation');

module.exports = `
    type Mutation {
        ${user}
        ${video}
    }
`;
