const User = require('../models/user.model');

module.exports = {
    // user gets attached to our req object during our middleware
    getLoggedUser: (req, res) => res.json(req.auth),
    login: async (req, res, next) => {
        try {
            req.auth = await User.checkLogin(req.body);
            next();
        } catch (error) {
            return res.status(401).json(error);
        }
    },
    logout: (_, res) => {
        res.clearCookie('userToken');
        return res.json({ message: "success"});
    }
};