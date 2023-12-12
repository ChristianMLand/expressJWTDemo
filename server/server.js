const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

require('dotenv').config();
require("./config/mongoose.config");

const PORT = process.env.PORT;
const app = express();

app.use(
    cookieParser(),
    cors({ credentials: true, origin: process.env.CLIENT_URI}), 
    express.urlencoded({ extended: true }), 
    express.json(),
);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));