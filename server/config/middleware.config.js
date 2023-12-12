const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, process.env.COOKIE_SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            // payload is the data stored in the jwt, we attach it to the request object so we can easily access it later
            req.user = payload; 
            next();
        }
    });
};

