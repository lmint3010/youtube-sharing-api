module.exports = `
    type Query {
        ${require('./user.query')}
        ${require('./video.query')}
    }
`;
