const mongoUserModel = require('../database/models/User.model');
const jwt = require('jsonwebtoken');

module.exports = async (req, _, next) => {
    const bearerToken = req.headers.authorization || '';
    req.query.auth = {
        status: 'unauthorized'
    };

    if (bearerToken) {
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        try {
            const decoded = token
                ? jwt.verify(token, process.env.SECRET_KEY)
                : null;
            if (decoded) {
                //check decoded information on database
                const isEmailMatched = await mongoUserModel.findOne({
                    email: decoded.email
                });
                req.query.auth = {
                    status: isEmailMatched ? 'authorized' : 'unauthorized',
                    payload: isEmailMatched ? decoded : null
                };
                next();
            } else {
                next();
            }
        } catch (err) {
            console.error(err.message);
            next();
            return;
        }
    } else {
        next();
    }
};
