const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, process.env.COOKIE_SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            // payload is the data stored in the jwt, we attach it to the request object so we can easily access it later
            req.auth = payload; 
            next();
        }
    });
};

module.exports.createJWT = (req, res) => {
    // pull out the non-sensitive data we want to store in the jwt
    const { _id, username } = req.auth;
    // store the user data in the jwt
    const token = jwt.sign({ _id, username }, process.env.COOKIE_SECRET);
    // pass the jwt along with our response
    return res.cookie("userToken", token, { httpOnly: true }).json(req.auth);
}
