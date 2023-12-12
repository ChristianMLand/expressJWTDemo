const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

module.exports = {
    create: async (req, res) => {
        try {
            let user = await User.create(req.body);
            user = user.toJSON();
            delete user.password;
            const token = jwt.sign(user, process.env.COOKIE_SECRET);
            return res.cookie("userToken", token, { httpOnly: true }).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
};