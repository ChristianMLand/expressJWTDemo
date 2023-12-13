const User = require('../models/user.model');

module.exports = {
    create: async (req, res, next) => {
        try {
            req.auth = await User.create(req.body);
            next();
        } catch (error) {
            return res.status(400).json(error);
        }
    }
};