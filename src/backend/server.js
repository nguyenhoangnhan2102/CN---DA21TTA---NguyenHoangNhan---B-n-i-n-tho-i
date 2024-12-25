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

const userRouter = require("./src/route/user");
const productRouter = require("./src/route/product");
const manufacturerRouter = require("./src/route/manufacturer");
const orderRouter = require("./src/route/order");
const fileRouter = require("./src/route/fileService");
const colorProductRouter = require("./src/route/colorProduct");
const cartRouter = require("./src/route/cart");

app.use("/api", userRouter);
app.use("/api", fileRouter);
app.use("/api/products", productRouter);
app.use("/api/manufactureres", manufacturerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/colorproducts", colorProductRouter);
app.use("/api/cart", cartRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Cơ sở dữ liệu đã chạy!!!");
});
