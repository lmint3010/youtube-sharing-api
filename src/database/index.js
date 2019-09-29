const mongoose = require('mongoose');
const mongoDefault = {
    url: 'mongodb://localhost/utubshare'
};

module.exports = {
    mongoose: () => {
        mongoose.connect(process.env.MONGO_URL || mongoDefault.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on(
            'error',
            console.error.bind(console, 'connection error:')
        );
        mongoose.connection.once('open', () =>
            console.log('Connected to MongoDB Database!')
        );
    }
};
