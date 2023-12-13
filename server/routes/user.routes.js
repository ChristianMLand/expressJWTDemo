const UserController = require('../controllers/user.controller');
const { createJWT } = require("../config/middleware.config");

module.exports = app => {
    app.post("/api/users", UserController.create, createJWT);
};