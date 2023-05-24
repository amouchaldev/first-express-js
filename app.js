require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// routes
const productsRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => console.log("server run on port 3000"));

app.use([
    express.json(),
    productsRoutes, 
    authRoutes
]);
