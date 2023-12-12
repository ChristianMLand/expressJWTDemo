const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

module.exports = {
    // user gets attached to our req object during our middleware
    getLoggedUser: (req, res) => res.json(req.user),
    register: async (req, res) => {
        try {
            let user = await User.create(req.body);
            // convert user object to json and remove sensitive data
            user = user.toJSON();
            delete user.password;
            // store the user json in the jwt
            const token = jwt.sign(user, process.env.COOKIE_SECRET);
            // pass the jwt along with our respons
            return res.cookie("userToken", token, { httpOnly: true }).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    login: async (req, res) => {
        try {
            let user = await User.checkLogin(req.body);
            user = user.toJSON();
            delete user.password;
            const token = jwt.sign(user, process.env.COOKIE_SECRET);
            return res.cookie("userToken", token, { httpOnly: true }).json(user);
        } catch (error) {
            return res.status(401).json(error);
        }
    },
    logout: (_, res) => {
        res.clearCookie('userToken');
        return res.json({ message: "success"});
    }
};