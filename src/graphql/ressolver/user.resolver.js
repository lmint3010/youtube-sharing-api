const mongoUserModel = require('../../database/models/User.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
    constructor({ email }) {
        this.email = email;
    }
}

module.exports = {
    getUser: async (_, context) => {
        const { status } = context.req.query.auth;
        if (status === 'unauthorized') {
            return {
                success: false,
                error: 'Please login!'
            };
        }
        const { email } = context.req.query.auth.payload;
        const userData = await mongoUserModel.findOne({ email });
        return {
            success: !!userData,
            error: userData ? null : 'Tài khoản không tồn tài!',
            user: {
                email: userData ? userData.email : null
            }
        };
    },

    addUser: async ({ user }) => {
        try {
            //confirm unique email
            const existedEmail = await mongoUserModel
                .findOne({
                    email: user.email
                })
                .lean();
            if (existedEmail)
                return {
                    success: false,
                    error: 'Email has been used!'
                };
            //create new account
            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword = await bcrypt.hash(user.password, salt);
            const newUser = new mongoUserModel({
                email: user.email,
                password: hashPassword
            });
            newUser.save(err => {
                if (err) console.error(err);
            });
            return {
                success: true,
                user: new User(user)
            };
        } catch (err) {
            console.error(err);
        }
    },

    login: async ({ user }, context) => {
        try {
            //check email and password
            const userData = await mongoUserModel
                .findOne({ email: user.email })
                .lean();
            if (userData) {
                const passwordCompared = await bcrypt.compare(
                    user.password,
                    userData.password
                );
                if (passwordCompared) {
                    //login
                    const payload = { id: userData._id, email: userData.email };
                    const secretKey = process.env.SECRET_KEY;
                    const token = await jwt.sign(payload, secretKey, {
                        expiresIn: '3h'
                    });
                    return {
                        success: true,
                        token: `Bearer ${token}`
                    };
                }
                return {
                    success: false,
                    error: 'Failed to login!'
                };
            } else {
                return {
                    success: false,
                    error: 'Email is not registered!'
                };
            }
        } catch (err) {
            console.error(err);
        }
    }
};
