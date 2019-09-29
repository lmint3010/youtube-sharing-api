const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    email: String,
    videoId: String,
    title: String,
    description: String
});

module.exports = mongoose.model('video', videoSchema);
