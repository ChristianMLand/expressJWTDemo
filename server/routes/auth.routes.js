const AuthController = require('../controllers/auth.controller');
const { authenticate, createJWT } = require("../config/middleware.config");
// authenticate middleware would be used for any routes we want to ensure the user is logged in for



module.exports = app => {
    app.post("/api/auth", AuthController.login, createJWT);
    app.get("/api/auth", authenticate, AuthController.getLoggedUser);
    app.delete("/api/auth", authenticate, AuthController.logout);
};