module.exports = `
    type User {
        id: ID,
        email: String!
    }

    type UserHandledResult {
        success: Boolean,
        error: String,
        user: User
    }

    type LoginResult {
        success: Boolean,
        error: String,
        token: String
    }

    type Video {
        _id: String,
        email: String,
        videoId: String,
        title: String,
        description: String
    }

    type VideoHandleResult {
        success: Boolean!,
        error: String,
        video: Video
    }

    type AllVideo {
        success: Boolean!,
        error: String,
        allVideo: [Video]
    }

    type DeleteVideoResult {
        success: Boolean!,
        error: String
    }
`;
