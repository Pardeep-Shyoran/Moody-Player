// import dotenv from "dotenv";
// dotenv.config();
require('dotenv').config()

// import app from "./src/App.js";
// import connectDB from "./src/db/db.js";
const app = require("./src/App")
const connectDB = require("./src/db/db.js")

connectDB();
app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running at port 3000");
});
