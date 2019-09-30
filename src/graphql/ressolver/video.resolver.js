const mongoVideoModel = require('../../database/models/Video.model');

module.exports = {
    addVideo: ({ video }) => {
        const newVideo = new mongoVideoModel({ ...video });
        newVideo.save(err => {
            return {
                success: false,
                error: 'Lỗi hệ thống!'
            };
        });
        return {
            success: true,
            video: { ...video }
        };
    },
    getAllVideo: async () => {
        const allVideo = await mongoVideoModel.find({}).lean();
        // console.log(allVideo[0]);
        return {
            success: true,
            allVideo
        };
    },
    deleteVideo: async ({ video }) => {
        const isDeleted = await mongoVideoModel.findByIdAndDelete(video._id);
        if (isDeleted) {
            return { success: true };
        }
        return { success: false, error: 'Fail to delete video. Server error!' };
    }
};
