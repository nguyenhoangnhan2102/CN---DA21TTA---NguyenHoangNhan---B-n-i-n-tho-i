//app-config

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();
require("./src/config/dataBase");
const port = process.env.PORT || 8081;
// Load environment variables

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    cookieSession({
        name: "session",
        secret: process.env.COOKIE_SECRET || "your-secret-key",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);
//end
app.use(
    cors({
        origin: process.env.URL_REACT,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204,
    })
);


// const userRouter = require("./src/routes/user");
const productRouter = require("./src/route/product");
// const categoryRouter = require("./src/routes/category");
// const manufacturerRouter = require("./src/routes/manufacturer");
// const fileRouter = require("./src/routes/fileRouter");

// app.use("/api", userRouter);
// app.use("/api", fileRouter);
app.use("/api/products", productRouter);
// app.use("/api/categories", categoryRouter);
// app.use("/api/manufactureres", manufacturerRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
