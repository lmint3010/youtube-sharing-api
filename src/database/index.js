const mongoose = require('mongoose');
const mongoDefault = {
    url: 'mongodb://localhost/utubshare'
};

module.exports = {
    mongoose: () => {
        const connect_url = process.env.MONGO_URL || mongoDefault.url;
        mongoose.connect(connect_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on(
            'error',
            console.error.bind(console, 'connection error:')
        );
        mongoose.connection.once('open', () =>
            console.log('Connected to MongoDB Database:\nURL:', connect_url)
        );
    }
};
