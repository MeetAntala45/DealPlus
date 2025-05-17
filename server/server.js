const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const connections = require("./config/dbconfig");
const userRoute = require("./routes/user.Routes");
const productRoute = require("./routes/products.Routes");
const bidsRoute = require("./routes/bids.Routes");
const notificationRoute = require("./routes/notification.Routes");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationRoute);

const path = require("path");
__dirname = path.resolve();

app.listen(port, () => console.log(`listening on port number ${port}`));
