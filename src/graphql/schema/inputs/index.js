module.exports = `
    input UserInput {
        email: String!,
        password: String!
    }

    input VideoInput {
        email: String!,
        videoId: String!,
        title: String!,
        description: String
    }

    input DeleteVideoInput {
        _id: String!
    }
`;
